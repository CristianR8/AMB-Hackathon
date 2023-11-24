import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <ProgressBar
        height="150"
        width="200"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#FFFFFF"
        barColor="#FFFFFF"
      />
    </div>
  );
};

export default Spinner;
