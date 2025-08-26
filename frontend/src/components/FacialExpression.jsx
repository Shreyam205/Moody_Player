import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FacialExpression = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Error accessing webcam:', err));
    };

    const handleVideoPlay = () => {
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

        const canvas = canvasRef.current;
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight
        };
        faceapi.matchDimensions(canvas, displaySize);

        const resized = faceapi.resizeResults(detections, displaySize);

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized)
        faceapi.draw.drawFaceExpressions(canvas, resized)

        // console.log(expression);

      }, 500);
    };
    loadModels().then(startVideo);

    videoRef.current && videoRef.current.addEventListener('play', handleVideoPlay);

  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        style={{ border: '1px solid #000' }}
      />
      <canvas
        ref={canvasRef}
        width="720"
        height="560"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      {/* <h2>Detected Expression: {expression}</h2> */}
    </div>
  );
};

export default FacialExpression;
