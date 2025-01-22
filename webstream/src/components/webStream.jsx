import { useState, useRef } from "react";

const WebcamStream = () => {
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  let mediaStream = null;

  const startStream = async () => {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setStreaming(true);
    } catch (error) {
      console.error("Error accessing webcam: ", error);
    }
  };

  const stopStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h1>Webcam Stream</h1>

      <div style={{ margin: "20px 0" }}>
        <video
          ref={videoRef}
          width="640"
          height="480"
          style={{ border: "1px solid #ccc" }}
        ></video>
      </div>

      <div style={{ margin: "20px 0" }}>
        <button
          onClick={startStream}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Start Stream
        </button>
        <button
          onClick={stopStream}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Stop Stream
        </button>
      </div>

      <div
        style={{
          margin: "20px 0",
          padding: "10px",
          borderRadius: "4px",
          backgroundColor: streaming ? "#e7f3e8" : "#ffebee",
          color: streaming ? "#2e7d32" : "#c62828",
        }}
      >
        Status: {streaming ? "Streaming" : "Stopped"}
      </div>
    </div>
  );
};

export default WebcamStream;
