import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FacialExpression = () => {
  const videoRef = useRef(null);
  // const canvasRef = useRef(null);

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

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
    let mostProbableExpression = 0
    let expressionName = ''

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return
    }

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbableExpression) {
        mostProbableExpression = detections[0].expressions;
        expressionName = expression;
      }
    }

    console.log(expressionName);
  }

  // Load models
  useEffect(() => {


    // const handleVideoPlay = () => {
    //   setInterval(async () => {


    //     // const canvas = canvasRef.current;
    //     // const displaySize = {
    //     //   width: videoRef.current.videoWidth,
    //     //   height: videoRef.current.videoHeight
    //     // };
    //     // faceapi.matchDimensions(canvas, displaySize);

    //     // const resized = faceapi.resizeResults(detections, displaySize);

    //     // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    //     // faceapi.draw.drawDetections(canvas, resized)
    //     // faceapi.draw.drawFaceExpressions(canvas, resized)

    //     // console.log(expression);

    //   }, 500);
    // };
    loadModels().then(startVideo);

    // videoRef.current && videoRef.current.addEventListener('play', handleVideoPlay);

  }, []);

  return (
    <div className='flex flex-col gap-12'>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        className='border-1 rounded-xl'
      />
      <button className='bg-purple-950 text-xl rounded-lg p-5' onClick={detectMood}>Detect Mood</button>
      {/* <h2>Detected Expression: {expression}</h2> */}
    </div>
  );
};

export default FacialExpression;
