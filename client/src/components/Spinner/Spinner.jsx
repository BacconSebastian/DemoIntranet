import React from "react";

import "./Spinner.css";

const Spinner = (props) => {
  return (
    <div className="background-spinner">
      <div
        className="spinner-container"
        style={props.top && { top: props.top }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
