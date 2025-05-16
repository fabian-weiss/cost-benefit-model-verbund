import React from "react";
import "@/styles/loading-dots.css";

function LoadingDots() {
  return (
    <div className="fw-loading-dots">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
  );
}

export default LoadingDots;
