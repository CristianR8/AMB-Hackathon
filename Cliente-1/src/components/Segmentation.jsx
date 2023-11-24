import React from "react";
import Return from './Return'
import ParticlesBackground from "./ParticlesBackground";
import { useLocation } from 'react-router-dom'

const Segmentation = () => {

    const location = useLocation();
    const { image } = location.state || {};
  return (
    <div className="p-4">
      {image && <img src={image} className="mx-auto h-96 w-96" />}
      <p className="text-center text-2xl mt-2">This is the result of the segmentation process!</p>
      <Return to="/"/>
    </div>
  );
};

export default Segmentation;
