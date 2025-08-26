import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FacialExpression = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [expression, setExpression] = useState('');

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Error accessing webcam:', err));
    };

    loadModels().then(startVideo);
  }, []);

  const onPlay = async () => {
    setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const options = new faceapi.TinyFaceDetectorOptions();
      const result = await faceapi
        .detectSingleFace(videoRef.current, options)
        .withFaceExpressions();

      const dims = faceapi.matchDimensions(canvasRef.current, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      });

      canvasRef.current
        .getContext('2d')
        .clearRect(0, 0, dims.width, dims.height);

      if (result) {
        const resized = faceapi.resizeResults(result, dims);
        faceapi.draw.drawDetections(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

        const expressions = result.expressions;
        const maxExp = Object.entries(expressions).reduce((a, b) =>
          a[1] > b[1] ? a : b
        );
        setExpression(maxExp[0]);
      }
    }, 500);
  };

  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        onPlay={onPlay}
        style={{ border: '1px solid #000' }}
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <h2>Detected Expression: {expression}</h2>
    </div>
  );
};

export default FacialExpression;
