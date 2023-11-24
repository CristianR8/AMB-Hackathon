import React from "react";
import Return from "./Return";
import ParticlesBackground from "./ParticlesBackground";
import { useLocation } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import segmentation from "../assets/img/segmentation.png";

const Segmentation = () => {
  const location = useLocation();
  const { originalImage, segmentedImage } = location.state || {};
  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4">
        {segmentedImage && (
          <>
          <div className="relative">
              <button
                className=" absolute bottom-52 left-80 flex items-center justify-center rounded-xl bg-neutral-950 hover:bg-neutral-50 hover:text-neutral-950 hover:scale-110 text-neutral-50 py-2 px-4 mt-4 text-lg font-bold transition-all duration-200 shadow-2xl"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = segmentedImage;
                  link.download = {segmentedImage};
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download<MdDownload className="ml-2" />
              </button>
            </div>
            <img src={originalImage} className="mx-auto right--64 h-96 w-96" />
            <img src={segmentedImage} className="mx-auto right--64 h-96 w-96" />
            
          </>
        )}
      </div>
      <p className="text-center text-2xl mt-2">
        This is the result of the segmentation process!
      </p>

      <Return to="/" />
    </div>
  );
};

export default Segmentation;
