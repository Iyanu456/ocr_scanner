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
    <div className="flex items-center gap-5">
      <div className='grid'>
      <button
        onClick={handleButtonClick}
        className="mb-4 px-4 py-3 w-full border-dashed border-[black] font-semibold text-[1.1em] border-[0.15em] rounded cursor-pointer"
      >
       
        Choose file {fileName && (<><span className='p-2'> - </span>
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
        className="w-[25em] p-2 border border-gray-300 rounded"
      ></textarea>
      </div>
     
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          className="max-w-[26em] mb-4 border border-gray-300"
        />
      )}
      
    </div>
  );
};

export default ImageUpload;
