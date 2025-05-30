import React, { useEffect, useRef, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import styled from "styled-components";
// import { detectFall } from "./fallDetectionUtils";
import { VideoContainer, StatusMessage, Controls, DebugPanel } from "./styles";
import api from "../../services/api";

import { detectFall, logPoseMetrics } from "./fallDetectionUtils";

// Initialize TensorFlow.js backend
tf.setBackend("webgl");

const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #809bce;
  font-weight: 700;
  text-align: center;
`;

const NurseInfo = styled.div`
  border-left: 3px solid #58b38e;
  padding: 15px;
  margin: 0 auto 20px;
  background-color: rgba(184, 224, 210, 0.2);
  border-radius: 0 4px 4px 0;
  max-width: 600px;
  text-align: center;
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #809bce;
    text-align: center;
  }
  
  p {
    font-size: 0.95rem;
    margin: 0;
    color: #555;
  }
`;

const FallDetection = ({ nurseName, nurseMessage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [net, setNet] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("Initializing camera...");
  const [debugMessages, setDebugMessages] = useState([]);
  const animationFrameRef = useRef(null);
  const previousHeightRef = useRef(0);
  const poseHistoryRef = useRef([]);
  const lastFallTimeRef = useRef(0);
  const isRunningRef = useRef(false); // Ref to track running state for animation frame

  const log = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugMessages((prev) => [...prev, `[${timestamp}] ${message}`]);
    console.log(message);
  };

  const initCamera = async () => {
    try {
      // Initialize TensorFlow.js backend if not already initialized
      await tf.ready();
      log("TensorFlow.js backend initialized: " + tf.getBackend());

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        log("Video element source set to media stream");

        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          log("Video metadata loaded");
          if (canvasRef.current) {
            // Set canvas dimensions to match video
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            log(
              `Canvas dimensions set to ${canvasRef.current.width}x${canvasRef.current.height}`
            );
          }
        };
      } else {
        log("ERROR: Video ref is null when setting srcObject");
      }

      setCameraStatus("Camera initialized, loading AI model...");

      log("Loading PoseNet model...");
      const posenetModel = await posenet.load({
        architecture: "MobileNetV1",
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 1.0,
        quantBytes: 4,
      });
      log("PoseNet model loaded successfully");

      setNet(posenetModel);
      setCameraStatus("Camera and AI model ready!");
      log("Camera and AI model initialized successfully");
    } catch (err) {
      console.error("Error initializing:", err);
      setCameraStatus("Error: " + err.message);
      log("ERROR initializing: " + err.message);
    }
  };

  const detectPose = async () => {
    // Exit early if we should no longer be running
    if (!isRunningRef.current) {
      return;
    }

    if (!net || !videoRef.current || !canvasRef.current) {
      // Schedule next frame despite errors
      if (isRunningRef.current) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
      }
      return;
    }

    try {
      const pose = await net.estimateSinglePose(videoRef.current, {
        flipHorizontal: false,
        scoreThreshold: 0.2, // LOWERED from 0.3 to 0.2
      });

      // Check again if we're still running after the pose estimation (which can take time)
      if (!isRunningRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        if (isRunningRef.current) {
          animationFrameRef.current = requestAnimationFrame(detectPose);
        }
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // LOWERED from 0.2 to 0.1 to capture more poses
      if (pose.score > 0.1) {
        drawKeypoints(pose.keypoints, ctx);
        drawSkeleton(pose.keypoints, ctx);

        // Add continuous logging of pose metrics regardless of fall detection
        logPoseMetrics(pose, log);

        poseHistoryRef.current.push(pose);
        if (poseHistoryRef.current.length > 5) {
          poseHistoryRef.current.shift();
        }

        const currentTime = Date.now();
        // Reduce the cooldown between fall detection checks from 1000ms to 500ms
        if (currentTime - lastFallTimeRef.current > 500) {
          if (
            detectFall(
              pose.keypoints,
              previousHeightRef,
              poseHistoryRef,
              lastFallTimeRef,
              log
            )
          ) {
            reportFall();
          }
        }
      }

      // Schedule the next frame only if we're still running
      if (isRunningRef.current) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
      }
    } catch (err) {
      console.error("Error in pose detection:", err);
      log("ERROR in pose detection: " + err.message);
      // Even on error, continue the animation frame if we're still running
      if (isRunningRef.current) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
      }
    }
  };

  const drawKeypoints = (keypoints, ctx) => {
    const fallDetectionPoints = [
      "leftShoulder",
      "rightShoulder",
      "leftHip",
      "rightHip",
      "nose",
    ];
    
    keypoints.forEach((keypoint) => {
      if (keypoint.score > 0.3) {
        const { x, y } = keypoint.position;

        ctx.beginPath();
        if (fallDetectionPoints.includes(keypoint.part)) {
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fillStyle = keypoint.part.includes("Shoulder")
            ? "#809bce" // Blue for shoulders
            : keypoint.part.includes("Hip")
            ? "#58b38e" // Green for hips
            : "#c6def1"; // Light blue for nose
        } else {
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = "#809bce"; // Blue for other points
        }
        ctx.fill();

        if (fallDetectionPoints.includes(keypoint.part)) {
          ctx.font = "12px Arial";
          ctx.fillStyle = "white";
          ctx.strokeStyle = "#333";
          ctx.lineWidth = 2;
          ctx.strokeText(keypoint.part, x + 10, y);
          ctx.fillText(keypoint.part, x + 10, y);
        }
      }
    });
  };

  const drawSkeleton = (keypoints, ctx) => {
    const adjacentKeyPoints = [
      ["nose", "leftEye"],
      ["leftEye", "leftEar"],
      ["nose", "rightEye"],
      ["rightEye", "rightEar"],
      ["leftShoulder", "rightShoulder"],
      ["leftShoulder", "leftElbow"],
      ["leftElbow", "leftWrist"],
      ["rightShoulder", "rightElbow"],
      ["rightElbow", "rightWrist"],
      ["leftShoulder", "leftHip"],
      ["rightShoulder", "rightHip"],
      ["leftHip", "rightHip"],
      ["leftHip", "leftKnee"],
      ["leftKnee", "leftAnkle"],
      ["rightHip", "rightKnee"],
      ["rightKnee", "rightAnkle"],
    ];

    const keypointMap = {};
    keypoints.forEach((keypoint) => {
      keypointMap[keypoint.part] = keypoint;
    });

    
    adjacentKeyPoints.forEach(([first, second]) => {
      const firstKeypoint = keypointMap[first];
      const secondKeypoint = keypointMap[second];

      if (
        firstKeypoint &&
        secondKeypoint &&
        firstKeypoint.score > 0.5 &&
        secondKeypoint.score > 0.5
      ) {
        ctx.beginPath();
        ctx.moveTo(firstKeypoint.position.x, firstKeypoint.position.y);
        ctx.lineTo(secondKeypoint.position.x, secondKeypoint.position.y);
        ctx.strokeStyle = "#a2d9c0"; // Light green for skeleton lines
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  const reportFall = async () => {
    try {
      setCameraStatus("⚠️ FALL DETECTED! Notifying nurse...");
      
      try {
        const API_BASE_URL = process.env.API_BASE_URL || "https://fallguardian-api.azurewebsites.net/api";
        
        // Call the API endpoint with hardcoded patient ID
        const response = await fetch(`${API_BASE_URL}/patient/67f296d63f00f2de5138ba5f/fall`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Include cookies for authentication
        });
        
        const data = await response.json();
        
        if (data.success) {
          setCameraStatus("✅ Fall reported successfully. Nurse has been notified.");
          log(`Fall reported to nurse successfully. ${data.message}`);
          
          // You could also log nurse details if needed
          if (data.nurse) {
            log(`Notified: ${data.nurse.name}`);
          }
        } else {
          setCameraStatus("❌ Error reporting fall: " + (data.message || 'Unknown error'));
          log("ERROR reporting fall: " + (data.message || 'Unknown error'));
        }
      } catch (error) {
        setCameraStatus("❌ Error reporting fall: " + error.message);
        log("ERROR reporting fall: " + error.message);
      }
      
      setTimeout(() => {
        if (isRunningRef.current) {
          setCameraStatus("");
        }
      }, 5000);
    } catch (err) {
      console.error("Error reporting fall:", err);
      setCameraStatus("❌ Error reporting fall: " + err.message);
    }
  };

  const startDetection = async () => {
    try {
      if (!stream) {
        log("ERROR: Stream is null, cannot start detection");
        setCameraStatus("Camera not ready. Please wait or refresh.");
        return;
      }

      if (!net) {
        log("ERROR: Net is null, cannot start detection");
        setCameraStatus("AI model not ready. Please wait or refresh.");
        return;
      }

      log("Starting fall detection...");

      // Clean up any existing animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Update both the state and the ref to ensure consistency
      setIsRunning(true);
      isRunningRef.current = true;

      previousHeightRef.current = 0;

      // Start the detection directly
      detectPose();

      log("Fall detection started");
    } catch (err) {
      console.error("Error starting detection:", err);
      setCameraStatus("Error starting detection: " + err.message);
      log("ERROR starting detection: " + err.message);
      setIsRunning(false);
      isRunningRef.current = false;
    }
  };

  const stopDetection = async () => {
    try {
      log("Stopping fall detection...");

      // Update both the state and the ref to ensure consistency
      setIsRunning(false);
      isRunningRef.current = false;

      // Cancel the animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Clear the canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      log("Fall detection stopped");
    } catch (err) {
      console.error("Error stopping detection:", err);
      setCameraStatus("Error stopping detection: " + err.message);
    }
  };

  useEffect(() => {
    log("Component mounted, initializing camera...");
    initCamera();

    return () => {
      log("Component unmounting, cleaning up...");

      // Make sure to update the ref to false to stop any ongoing detection
      isRunningRef.current = false;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "0 auto", 
      padding: "20px"
    }}>
      <Header>Fall Detection Monitor</Header>

      <NurseInfo>
        <h3>Assigned Nurse: {nurseName}</h3>
        <p>{nurseMessage}</p>
      </NurseInfo>
      
      <VideoContainer>
        <video ref={videoRef} width="640" height="480" autoPlay playsInline />
        <canvas ref={canvasRef} width="640" height="480" />
      </VideoContainer>

      <StatusContainer>
        <StatusMessage className={isRunning ? "running" : "stopped"}>
          {isRunning
            ? "Fall detection is ACTIVE. AI is monitoring for falls."
            : 'Fall detection is INACTIVE. Click "Start Detection" to begin monitoring.'}
        </StatusMessage>
      </StatusContainer>

      <StatusContainer>
        {cameraStatus && (
          <StatusMessage>{cameraStatus}</StatusMessage>
        )}
      </StatusContainer>

      <Controls>
        <button
          className={`button start ${isRunning ? "hidden" : ""}`}
          onClick={startDetection}
        >
          Start Detection
        </button>
        <button
          className={`button stop ${!isRunning ? "hidden" : ""}`}
          onClick={stopDetection}
        >
          Stop Detection
        </button>
      </Controls>

      <DebugPanel>
        {debugMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </DebugPanel>
    </div>
  );
};

export default FallDetection;