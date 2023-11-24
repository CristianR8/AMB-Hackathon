import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null); // This is the file to be uploaded
  const [previewImage, setPreviewImage] = useState(null); // This is the image data URL for previewing
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSegmentation = () => {
    if (!selectedImage) {
      console.error("No image selected");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);

    fetch("http://localhost:5001/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        setIsLoading(false);
        const segmentedImageUrl = URL.createObjectURL(blob);
        const originalImageUrl = URL.createObjectURL(selectedImage);
        navigate("/segmentation", {
          state: {
            originalImage: originalImageUrl,
            segmentedImage: segmentedImageUrl,
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Set the file object for uploading

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result); // Set the data URL for previewing
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {!isLoading && (
        <div
          className="p-14 rounded-lg static flex flex-col"
          style={{
            background:
              "linear-gradient(to right, rgba(1, 1, 1, 0.7), rgba(1, 1, 1, 0.7))",
          }}
        >
          <h2 className="text-4xl font-extrabold realtive dark:text-white">
            Load the orthophoto
          </h2>
          <input
            className="my-8 block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-50 focus:outline-none dark:bg-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-900"
            id="large_size"
            type="file"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-center text-lg font-extrabold">
                Vista previa:
              </h3>
              <img
                className="h-60 w-60 object-contain"
                src={previewImage}
                alt="Selected"
              />
              <button
                className="mt-8 text-bold text-lg z-0 hover:scale-110 hover:bg-neutral-50 hover:text-neutral-900  hover:border-neutral-950 transition-all duration-200 relative"
                onClick={handleSegmentation}
              >
                Segmentar
              </button>
            </div>
          )}
        </div>
      )}
      {isLoading && <Spinner />}
    </>
  );
};

export default Upload;
