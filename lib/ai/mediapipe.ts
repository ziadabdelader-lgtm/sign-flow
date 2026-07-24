// TODO: MediaPipe model files must be loaded client-side via CDN or local bundle
export const mediapipeConfig = {
  handsModel: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands',
  poseModel: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose',
  holisticModel: 'https://cdn.jsdelivr.net/npm/@mediapipe/holistic/holistic',
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
};
