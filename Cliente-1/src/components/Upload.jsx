import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null); // This is the file to be uploaded
  const [previewImage, setPreviewImage] = useState(null);   // This is the image data URL for previewing

  const navigate = useNavigate();

  const handleSegmentation = () => {
    if (!selectedImage) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Assuming 'data' contains the path or URL to the processed image
      const resultImage = data.filename; // Adjust this if your backend sends a different field
      navigate('/segmentation', { state: { image: resultImage } });
    })
    .catch(error => {
      console.error('Error:', error);
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
    <div className="p-14 rounded-lg static flex flex-col" style={{ background: "linear-gradient(to right, rgba(1, 1, 1, 0.7), rgba(1, 1, 1, 0.7))", }}>
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
  );
};

export default Upload;