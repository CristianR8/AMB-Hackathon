import React from "react";
import Return from "./Return";
import ParticlesBackground from "./ParticlesBackground";
import { useLocation } from "react-router-dom";
import segmentation from "../assets/img/segmentation.png";

const Segmentation = () => {
  const location = useLocation();
  const { originalImage } = location.state || {};
  const { segmentedImage } = location.state || {};
  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4">
        {originalImage && (
          <>
            <img src={originalImage} className="mx-auto right--64 h-96 w-96" />
            <img src={segmentedImage} className="mx-auto right--64 h-96 w-96" />
          </>
        )}
        <Return to="/" />
      </div>
      <p className="text-center text-2xl mt-2">
        This is the result of the segmentation process!
      </p>
    </div>
  );
};

export default Segmentation;
