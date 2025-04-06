// Add reusable styled-components or CSS-in-JS styles here if required.
import styled from "styled-components";

export const VideoContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  text-align: center;
  position: relative;

  video {
    width: 100%;
    max-width: 640px;
    border: 2px solid #809bce;
    border-radius: 8px;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 640px;
    width: 100%;
    border-radius: 8px;
  }
`;

export const StatusMessage = styled.div`
  margin: 20px auto;
  padding: 15px 25px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: inline-block;
  max-width: 90%;

  &.running {
    background-color: rgba(184, 224, 210, 0.8);
    color: #58b38e;
    border-left: 3px solid #58b38e;
  }

  &.stopped {
    background-color: rgba(252, 213, 213, 0.8);
    color: #e74c3c;
    border-left: 3px solid #e74c3c;
  }

  &.hidden {
    display: none;
  }
`;

export const Controls = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;

  .button {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &.start {
      background-color: #58b38e;
      color: white;

      &:hover {
        background-color: #489e7b;
      }
    }

    &.stop {
      background-color: #809bce;
      color: white;

      &:hover {
        background-color: #6c87ba;
      }
    }

    &.hidden {
      display: none;
    }
  }
`;

export const DebugPanel = styled.div`
  font-family: monospace;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  white-space: pre-wrap;
  color: #333;
  font-size: 12px;
  text-align: left;
  height: 100px;
  overflow-y: auto;
  box-shadow: 0 0 0px 5px rgba(128, 155, 206, 0.1);
  border: 1px solid rgba(128, 155, 206, 0.2);
`;
