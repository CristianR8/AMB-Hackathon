import React, { useState } from "react";
import ParticlesBackground from "./ParticlesBackground";
import Upload from "./Upload";
import Segmentation from "./Segmentation"
import logo from '../../src/assets/img/logo.png';

const Dashboard = () => {
  
  return (
    <>
      <ParticlesBackground />
      <Upload />
    </>
  );
};

export default Dashboard;
