// // Modified fallDetectionUtils.js

// // Export the createKeypointMap and calculateConfidence functions so they can be used by logPoseMetrics
// export const createKeypointMap = (keypoints) => {
//   const map = {};
//   keypoints.forEach((keypoint) => {
//     map[keypoint.part] = keypoint;
//   });
//   return map;
// };

// export const calculateConfidence = (keypointMap) => {
//   const leftShoulder = keypointMap.leftShoulder
//     ? keypointMap.leftShoulder.score
//     : 0;
//   const rightShoulder = keypointMap.rightShoulder
//     ? keypointMap.rightShoulder.score
//     : 0;
//   const leftHip = keypointMap.leftHip ? keypointMap.leftHip.score : 0;
//   const rightHip = keypointMap.rightHip ? keypointMap.rightHip.score : 0;
//   const nose = keypointMap.nose ? keypointMap.nose.score : 0;
//   const leftEye = keypointMap.leftEye ? keypointMap.leftEye.score : 0;
//   const rightEye = keypointMap.rightEye ? keypointMap.rightEye.score : 0;
//   const leftKnee = keypointMap.leftKnee ? keypointMap.leftKnee.score : 0;
//   const rightKnee = keypointMap.rightKnee ? keypointMap.rightKnee.score : 0;
//   const leftAnkle = keypointMap.leftAnkle ? keypointMap.leftAnkle.score : 0;
//   const rightAnkle = keypointMap.rightAnkle ? keypointMap.rightAnkle.score : 0;

//   return {
//     shoulders: (leftShoulder + rightShoulder) / 2,
//     hips: (leftHip + rightHip) / 2,
//     head: (nose + leftEye + rightEye) / 3,
//     knees: (leftKnee + rightKnee) / 2,
//     ankles: (leftAnkle + rightAnkle) / 2,
//   };
// };

// export const detectFall = (
//   keypoints,
//   previousHeightRef,
//   poseHistoryRef,
//   lastFallTimeRef,
//   log
// ) => {
//   const currentTime = Date.now();

//   // Increase cooldown back to 5 seconds
//   if (currentTime - lastFallTimeRef.current < 5000) return false; // 5 second cooldown

//   const keypointMap = createKeypointMap(keypoints);
//   const confidence = calculateConfidence(keypointMap);

//   // Always log confidence regardless of detection
//   log(
//     `Confidence: Shoulders=${confidence.shoulders.toFixed(
//       2
//     )}, Hips=${confidence.hips.toFixed(2)}, Head=${confidence.head.toFixed(2)}`
//   );

//   // Add a minimum overall confidence requirement for any fall detection
//   const overallConfidence =
//     (confidence.shoulders + confidence.hips + confidence.head) / 3;
//   if (overallConfidence < 0.4) {
//     log(
//       `Insufficient confidence for reliable detection: ${overallConfidence.toFixed(
//         2
//       )}`
//     );
//     return false;
//   }

//   let fallDetectionMethods = 0; // Count how many methods detect a fall
//   let methodsChecked = 0; // Count how many methods were checked

//   // METHOD 1: Shoulder displacement - INCREASED THRESHOLD BACK TO 0.5
//   if (confidence.shoulders > 0.5) {
//     methodsChecked++;
//     if (detectFallByShoulders(keypointMap, previousHeightRef, log)) {
//       fallDetectionMethods++;
//     }
//   }

//   // METHOD 2: Hip displacement - INCREASED THRESHOLD BACK TO 0.5
//   if (confidence.hips > 0.5) {
//     methodsChecked++;
//     if (detectFallByHips(keypointMap, log)) {
//       fallDetectionMethods++;
//     }
//   }

//   // METHOD 3: Vertical body alignment - INCREASED THRESHOLDS
//   if (
//     confidence.head > 0.5 &&
//     (confidence.knees > 0.4 || confidence.ankles > 0.4)
//   ) {
//     methodsChecked++;
//     if (detectFallByVerticalAlignment(keypointMap, log)) {
//       fallDetectionMethods++;
//     }
//   }

//   // METHOD 4: Rapid movement detection - REQUIRE HIGHER CONFIDENCE
//   if (poseHistoryRef.current.length >= 3) {
//     methodsChecked++;
//     if (detectFallByRapidMovement(poseHistoryRef, log)) {
//       fallDetectionMethods++;
//     }
//   }

//   // Modified METHOD 5: Position-based fall detection with stricter requirements
//   if (confidence.head > 0.5 && confidence.shoulders > 0.4) {
//     methodsChecked++;
//     if (detectFallByPosition(keypointMap, log)) {
//       fallDetectionMethods++;
//     }
//   }

//   // Require at least 2 methods to detect a fall OR 1 method with very high confidence
//   let fallDetected = false;

//   if (methodsChecked >= 3 && fallDetectionMethods >= 2) {
//     log(
//       `FALL CONFIRMED: ${fallDetectionMethods}/${methodsChecked} detection methods triggered`
//     );
//     fallDetected = true;
//   } else if (
//     methodsChecked >= 1 &&
//     fallDetectionMethods >= 1 &&
//     overallConfidence > 0.7
//   ) {
//     log(
//       `FALL CONFIRMED: High confidence detection (${overallConfidence.toFixed(
//         2
//       )})`
//     );
//     fallDetected = true;
//   }

//   if (fallDetected) {
//     lastFallTimeRef.current = currentTime;
//   }

//   return fallDetected;
// };

// const detectFallByShoulders = (keypointMap, previousHeightRef, log) => {
//   const leftShoulder = keypointMap.leftShoulder;
//   const rightShoulder = keypointMap.rightShoulder;

//   // INCREASED THRESHOLD BACK TO 0.5
//   if (
//     !leftShoulder ||
//     !rightShoulder ||
//     leftShoulder.score < 0.5 ||
//     rightShoulder.score < 0.5
//   ) {
//     return false;
//   }

//   const avgShoulderY = (leftShoulder.position.y + rightShoulder.position.y) / 2;

//   if (previousHeightRef.current === 0) {
//     previousHeightRef.current = avgShoulderY;
//     log("Initial shoulder height: " + avgShoulderY.toFixed(2));
//     return false;
//   }

//   // INCREASED THRESHOLD BACK TO 1.5 - requires larger falls
//   const fallThreshold = previousHeightRef.current * 1.5;

//   log(
//     `Shoulders - Previous: ${previousHeightRef.current.toFixed(
//       2
//     )}, Current: ${avgShoulderY.toFixed(2)}, Threshold: ${fallThreshold.toFixed(
//       2
//     )}`
//   );

//   if (avgShoulderY > fallThreshold) {
//     log("Fall indicator: Shoulders moved down significantly");
//     // Only update reference slightly to prevent adapting to falls
//     previousHeightRef.current =
//       previousHeightRef.current * 0.9 + avgShoulderY * 0.1;
//     return true;
//   }

//   // Normal gradual adaptation to height changes
//   previousHeightRef.current =
//     previousHeightRef.current * 0.8 + avgShoulderY * 0.2;
//   return false;
// };

// const detectFallByHips = (keypointMap, log) => {
//   const leftHip = keypointMap.leftHip;
//   const rightHip = keypointMap.rightHip;

//   // INCREASED THRESHOLD BACK TO 0.5
//   if (!leftHip || !rightHip || leftHip.score < 0.5 || rightHip.score < 0.5) {
//     return false;
//   }

//   const hipXDiff = Math.abs(leftHip.position.x - rightHip.position.x);
//   const expectedHipWidth = 480 * 0.2; // Using frame height as reference

//   // INCREASED BACK TO 2x - requires more dramatic hip displacement
//   if (hipXDiff > expectedHipWidth * 2) {
//     log(
//       `Fall indicator: Hips spread horizontally: ${hipXDiff.toFixed(
//         2
//       )} (normal: ~${expectedHipWidth.toFixed(2)})`
//     );
//     return true;
//   }

//   return false;
// };

// const detectFallByVerticalAlignment = (keypointMap, log) => {
//   const nose = keypointMap.nose;
//   const leftAnkle = keypointMap.leftAnkle;
//   const rightAnkle = keypointMap.rightAnkle;

//   // INCREASED THRESHOLD BACK TO 0.5
//   if (!nose || (!leftAnkle && !rightAnkle) || nose.score < 0.5) {
//     return false;
//   }

//   const ankleY =
//     leftAnkle && leftAnkle.score > 0.4
//       ? leftAnkle.position.y
//       : rightAnkle && rightAnkle.score > 0.4
//       ? rightAnkle.position.y
//       : 0;

//   if (ankleY === 0) return false;

//   const headToAnkleDiff = Math.abs(nose.position.y - ankleY);
//   const expectedDiff = 480 * 0.5; // Using frame height as reference

//   // REDUCED RATIO - requires head to be much closer to feet level
//   if (headToAnkleDiff < expectedDiff * 0.4) {
//     log(
//       `Fall indicator: Head near feet level, vertical diff: ${headToAnkleDiff.toFixed(
//         2
//       )} (expected: ~${expectedDiff.toFixed(2)})`
//     );
//     return true;
//   }

//   return false;
// };

// const detectFallByRapidMovement = (poseHistoryRef, log) => {
//   if (poseHistoryRef.current.length < 3) return false;

//   const nosePositions = poseHistoryRef.current
//     .map((pose) => pose.keypoints.find((kp) => kp.part === "nose"))
//     .filter((nose) => nose && nose.score > 0.5); // INCREASED FROM 0.3 to 0.5

//   if (nosePositions.length < 3) return false;

//   const oldestY = nosePositions[0].position.y;
//   const newestY = nosePositions[nosePositions.length - 1].position.y;
//   const frames = nosePositions.length - 1;
//   const verticalSpeed = (newestY - oldestY) / frames;

//   // INCREASED FROM 20 to 25 - requires faster movement
//   if (verticalSpeed > 25) {
//     log(
//       `Fall indicator: Rapid downward movement: ${verticalSpeed.toFixed(
//         2
//       )} pixels/frame`
//     );
//     return true;
//   }

//   return false;
// };

// // MODIFIED: Position-based fall detection with stricter requirements
// const detectFallByPosition = (keypointMap, log) => {
//   const nose = keypointMap.nose;
//   const leftShoulder = keypointMap.leftShoulder;
//   const rightShoulder = keypointMap.rightShoulder;

//   // Increased confidence requirements
//   if (!nose || nose.score < 0.5) return false;

//   // If no shoulders detected with reasonable confidence, we can't use this method
//   if (
//     (!leftShoulder || leftShoulder.score < 0.4) &&
//     (!rightShoulder || rightShoulder.score < 0.4)
//   ) {
//     return false;
//   }

//   // Calculate expected normal vertical position relationships
//   const shoulderY =
//     leftShoulder && leftShoulder.score >= 0.4
//       ? leftShoulder.position.y
//       : rightShoulder && rightShoulder.score >= 0.4
//       ? rightShoulder.position.y
//       : 0;

//   if (shoulderY === 0) return false;

//   // In standing position, nose should be ABOVE shoulders
//   // If nose is significantly BELOW shoulders, person may have fallen
//   const noseToShoulderDiff = nose.position.y - shoulderY;

//   // INCREASED THRESHOLD from 50 to 80 - requires nose to be much lower than shoulders
//   if (noseToShoulderDiff > 80) {
//     log(
//       `Fall indicator: Head position below shoulders: diff=${noseToShoulderDiff.toFixed(
//         2
//       )}px`
//     );
//     return true;
//   }

//   return false;
// };

// Function to log pose metrics continuously
export const logPoseMetrics = (pose, log) => {
  if (!pose || !pose.keypoints) return;

  const keypointMap = createKeypointMap(pose.keypoints);
  const confidence = calculateConfidence(keypointMap);

  log(
    `Pose Metrics - Confidence: Shoulders=${confidence.shoulders.toFixed(
      2
    )}, Hips=${confidence.hips.toFixed(2)}, Head=${confidence.head.toFixed(2)}`
  );
};

export const detectFall = (
  keypoints,
  previousHeightRef,
  poseHistoryRef,
  lastFallTimeRef,
  log
) => {
  const currentTime = Date.now();
  if (currentTime - lastFallTimeRef.current < 10000) return false; // 10 second cooldown

  const keypointMap = createKeypointMap(keypoints);
  const confidence = calculateConfidence(keypointMap);

  log(
    `Confidence: Shoulders=${confidence.shoulders.toFixed(
      2
    )}, Hips=${confidence.hips.toFixed(2)}, Head=${confidence.head.toFixed(2)}`
  );

  let fallDetected = false;

  // METHOD 1: Shoulder displacement
  if (confidence.shoulders > 0.6) {
    fallDetected =
      detectFallByShoulders(keypointMap, previousHeightRef, log) ||
      fallDetected;
  }

  // METHOD 2: Hip displacement
  if (confidence.hips > 0.6) {
    fallDetected = detectFallByHips(keypointMap, log) || fallDetected;
  }

  // METHOD 3: Vertical body alignment
  if (
    confidence.head > 0.6 &&
    (confidence.knees > 0.5 || confidence.ankles > 0.5)
  ) {
    fallDetected =
      detectFallByVerticalAlignment(keypointMap, log) || fallDetected;
  }

  // METHOD 4: Rapid movement detection
  if (poseHistoryRef.current.length >= 3) {
    fallDetected =
      detectFallByRapidMovement(poseHistoryRef, log) || fallDetected;
  }

  if (fallDetected) {
    lastFallTimeRef.current = currentTime;
  }

  return fallDetected;
};

const createKeypointMap = (keypoints) => {
  const map = {};
  keypoints.forEach((keypoint) => {
    map[keypoint.part] = keypoint;
  });
  return map;
};

const calculateConfidence = (keypointMap) => {
  const leftShoulder = keypointMap.leftShoulder
    ? keypointMap.leftShoulder.score
    : 0;
  const rightShoulder = keypointMap.rightShoulder
    ? keypointMap.rightShoulder.score
    : 0;
  const leftHip = keypointMap.leftHip ? keypointMap.leftHip.score : 0;
  const rightHip = keypointMap.rightHip ? keypointMap.rightHip.score : 0;
  const nose = keypointMap.nose ? keypointMap.nose.score : 0;
  const leftEye = keypointMap.leftEye ? keypointMap.leftEye.score : 0;
  const rightEye = keypointMap.rightEye ? keypointMap.rightEye.score : 0;
  const leftKnee = keypointMap.leftKnee ? keypointMap.leftKnee.score : 0;
  const rightKnee = keypointMap.rightKnee ? keypointMap.rightKnee.score : 0;
  const leftAnkle = keypointMap.leftAnkle ? keypointMap.leftAnkle.score : 0;
  const rightAnkle = keypointMap.rightAnkle ? keypointMap.rightAnkle.score : 0;

  return {
    shoulders: (leftShoulder + rightShoulder) / 2,
    hips: (leftHip + rightHip) / 2,
    head: (nose + leftEye + rightEye) / 3,
    knees: (leftKnee + rightKnee) / 2,
    ankles: (leftAnkle + rightAnkle) / 2,
  };
};

const detectFallByShoulders = (keypointMap, previousHeightRef, log) => {
  const leftShoulder = keypointMap.leftShoulder;
  const rightShoulder = keypointMap.rightShoulder;

  if (
    !leftShoulder ||
    !rightShoulder ||
    leftShoulder.score < 0.5 ||
    rightShoulder.score < 0.5
  ) {
    return false;
  }

  const avgShoulderY = (leftShoulder.position.y + rightShoulder.position.y) / 2;

  if (previousHeightRef.current === 0) {
    previousHeightRef.current = avgShoulderY;
    log("Initial shoulder height: " + avgShoulderY.toFixed(2));
    return false;
  }

  const fallThreshold = previousHeightRef.current * 1.4;

  log(
    `Shoulders - Previous: ${previousHeightRef.current.toFixed(
      2
    )}, Current: ${avgShoulderY.toFixed(2)}, Threshold: ${fallThreshold.toFixed(
      2
    )}`
  );

  if (avgShoulderY > fallThreshold) {
    log("FALL DETECTED! Shoulders moved down significantly");
    previousHeightRef.current = avgShoulderY;
    return true;
  }

  previousHeightRef.current =
    previousHeightRef.current * 0.8 + avgShoulderY * 0.2;
  return false;
};

const detectFallByHips = (keypointMap, log) => {
  const leftHip = keypointMap.leftHip;
  const rightHip = keypointMap.rightHip;

  if (!leftHip || !rightHip || leftHip.score < 0.5 || rightHip.score < 0.5) {
    return false;
  }

  const hipXDiff = Math.abs(leftHip.position.x - rightHip.position.x);
  const expectedHipWidth = 480 * 0.2; // Using frame height as reference

  if (hipXDiff > expectedHipWidth * 2) {
    log(
      `FALL DETECTED! Hips spread horizontally: ${hipXDiff.toFixed(
        2
      )} (normal: ~${expectedHipWidth.toFixed(2)})`
    );
    return true;
  }

  return false;
};

const detectFallByVerticalAlignment = (keypointMap, log) => {
  const nose = keypointMap.nose;
  const leftAnkle = keypointMap.leftAnkle;
  const rightAnkle = keypointMap.rightAnkle;

  if (!nose || (!leftAnkle && !rightAnkle) || nose.score < 0.5) {
    return false;
  }

  const ankleY =
    leftAnkle && leftAnkle.score > 0.5
      ? leftAnkle.position.y
      : rightAnkle && rightAnkle.score > 0.5
      ? rightAnkle.position.y
      : 0;

  if (ankleY === 0) return false;

  const headToAnkleDiff = Math.abs(nose.position.y - ankleY);
  const expectedDiff = 480 * 0.5; // Using frame height as reference

  if (headToAnkleDiff < expectedDiff * 0.5) {
    log(
      `FALL DETECTED! Head near feet level, vertical diff: ${headToAnkleDiff.toFixed(
        2
      )} (expected: ~${expectedDiff.toFixed(2)})`
    );
    return true;
  }

  return false;
};

const detectFallByRapidMovement = (poseHistoryRef, log) => {
  if (poseHistoryRef.current.length < 3) return false;

  const nosePositions = poseHistoryRef.current
    .map((pose) => pose.keypoints.find((kp) => kp.part === "nose"))
    .filter((nose) => nose && nose.score > 0.5);

  if (nosePositions.length < 3) return false;

  const oldestY = nosePositions[0].position.y;
  const newestY = nosePositions[nosePositions.length - 1].position.y;
  const frames = nosePositions.length - 1;
  const verticalSpeed = (newestY - oldestY) / frames;

  if (verticalSpeed > 30) {
    log(
      `FALL DETECTED! Rapid downward movement: ${verticalSpeed.toFixed(
        2
      )} pixels/frame`
    );
    return true;
  }

  return false;
};
