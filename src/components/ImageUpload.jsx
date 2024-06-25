import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
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

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={handleImageUpload}
        className="mb-4 p-2 border border-[black] rounded border-[2px] border-dashed rounded-md"
      />
      {selectedImage && (
        <img
        
          src={selectedImage}
          alt="Selected"
          className="max-w-[5em] mb-4 border border-gray-300"
        />
      )}
      <textarea
        value={ocrText}
        readOnly
        rows="10"
        className="w-full max-w-2xl p-2 border border-gray-300 rounded"
      ></textarea>
    </div>
  );
};

export default ImageUpload;
