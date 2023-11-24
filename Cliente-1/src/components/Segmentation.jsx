import React, { useState } from "react";
import Return from "./Return";
import { useLocation } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import segmentation from "../assets/img/segmentation.png";
import logo from "../assets/img/logo.png"
import Modal from "react-modal";

Modal.setAppElement("#root");

const Segmentation = () => {
  const location = useLocation();
  const { originalImage, segmentedImage } = location.state || {};
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState(null);

  const openModal = (image) => {
    setSelectedImageForModal(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4">
        {originalImage && (
          <>
            <div className="relative">
              <button
                className="absolute bottom-52 left-80 flex items-center justify-center rounded-xl bg-neutral-950 hover:bg-neutral-50 hover:text-neutral-950 hover:scale-110 text-neutral-50 py-2 px-4 mt-4 text-lg font-bold transition-all duration-200 shadow-2xl"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = originalImage;
                  link.download = { originalImage };
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download
                <MdDownload className="ml-2" />
              </button>
            </div>
            <img
              src={originalImage}
              alt="Original"
              className="mx-auto h-96 w-96 cursor-pointer"
              onClick={() => openModal(originalImage)}
            />
          </>
        )}
        {segmentedImage && (
          <>
            <img
              src={segmentedImage}
              alt="Segmented"
              className="mx-auto h-96 w-96 cursor-pointer"
              onClick={() => openModal(segmentedImage)}
            />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Image Modal"
              className="Modal"
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.75)", // Adjust opacity here if needed
                },
                content: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  border: "none", // Remove border
                  background: "rgba(4, 4, 4, 0.1)",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "0px",
                  outline: "none",
                  padding: "50px",
                  transform: "translate(-50%, -50%)",
                },
              }}
              overlayClassName="Overlay"
            >
              <img
                src={selectedImageForModal}
                alt="Modal Content"
                
              />
              <div className="flex flex-col items-center justify-center">
                <button onClick={closeModal} className="mx-auto mt-4 bg-neutral-800 hover:bg-neutral-50 hover:text-neutral-950 hover:scale-110 text-neutral-50 py-2 px-4 text-lg font-bold transition-all duration-200">
                  Close
                </button>
              </div>
            </Modal>
          </>
        )}
      </div>
      <p className="text-center font-extrabold font-mono text-xl mt-2">
        This is the result of the segmentation process!
      </p>

      <Return to="/" />
    </div>
  );
};

export default Segmentation;
