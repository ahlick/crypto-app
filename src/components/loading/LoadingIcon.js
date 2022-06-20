import React from "react";
import "./LoadingIcon.css";

function LoadingIcon() {
  return (
    <div className="loader">
      <div className="outer"></div>
      <div  className="middle"></div>
      <div className="inner"></div>
    </div>
  );
}

export default LoadingIcon;
