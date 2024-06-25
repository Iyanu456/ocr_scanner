// src/components/ImageUpload.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFileName(file.name);
      Tesseract.recognize(
        file,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        setOcrText(text);
      });
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className={`grid border rounded-md p-4 ${selectedImage ? "grid grid-cols-[1fr,1fr] lg:w-[60vw]" : "grid-cols-[1fr] w-[25em]"} justify-center center-align gap-5`}>
      <div className='grid'>
      <button
        onClick={handleButtonClick}
        className="mb-4 px-4 py-3 w-full border-dashed border-[black] font-semibold text-[1.1em] border-[0.15em] rounded cursor-pointer"
      >
       
        Choose a file {fileName && (<><span className='p-2'> - </span>
        <span className='font-normal '>{fileName}</span>
      </>)}
      </button>
      
      <input
        type="file"
        id="fileInput"
        onChange={handleImageUpload}
        className="hidden"
      />
      <textarea
        value={ocrText}
        readOnly
        rows="10"
        className="w-full p-2 border border-gray-300 rounded"
      ></textarea>
      </div>
     
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full cover my-auto mb-4 border border-gray-300"
        />
      )}
      
    </div>
  );
};

export default ImageUpload;
