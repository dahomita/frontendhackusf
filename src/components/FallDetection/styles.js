import styled from "styled-components";

export const VideoContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  text-align: center;
  position: relative;

  video {
    width: 100%;
    max-width: 640px;
    border: 2px solid #3498db;
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
  margin: 20px 0;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &.running {
    background-color: #d5f5e3;
    color: #27ae60;
  }

  &.stopped {
    background-color: #fadbd8;
    color: #e74c3c;
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
      background-color: #27ae60;
      color: white;

      &:hover {
        background-color: #219853;
      }
    }

    &.stop {
      background-color: #e74c3c;
      color: white;

      &:hover {
        background-color: #c0392b;
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
  box-shadow: 0 0 0px 5px rgba(0, 0, 0, 0.2);
`;
