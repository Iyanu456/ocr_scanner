import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [ocrText, setOcrText] = useState('');
  const [fileNames, setFileNames] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files.map(file => URL.createObjectURL(file)));
    setFileNames(files.map(file => file.name));

    files.forEach((file) => {
      Tesseract.recognize(
        file,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        setOcrText(prevText => `${prevText}\n-------------------------------------[${file.name}]\n${text}\n`);
      });
    });
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(ocrText);
  };

  return (
    <div className={`flex flex-wrap md:grid rounded-md md:p-4 lg:p-4 ${selectedImages.length > 0 ? "lg:grid lg:grid-cols-[1fr,1fr] lg:w-[65vw]" : "lg:grid-cols-[1fr] lg:w-[25em]"} justify-center center-align gap-5`}>
      <div className='flex flex-col w-[80vw]'>
        <button
          onClick={handleButtonClick}
          className="mb-4 px-4 py-3 w-full border-dashed border-[black] font-semibold text-[1.1em] border-[0.15em] rounded cursor-pointer"
        >
          Choose files {fileNames.length > 0 && (
            <>
              <span className='p-2'> - </span>
              <span className='font-normal '>{fileNames.join(', ')}</span>
            </>
          )}
        </button>
        <input
          type="file"
          id="fileInput"
          onChange={handleImageUpload}
          className="hidden"
          multiple
        />
        <textarea
          value={ocrText}
          readOnly
          rows="10"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        ></textarea>
        <button
          onClick={handleCopyText}
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Copy Text
        </button>
      </div>

      {selectedImages.length > 0 && selectedImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Selected ${index + 1}`}
          className="hidden md:block lg:block w-full h-full object-cover my-auto mb-4 border border-gray-300"
        />
      ))}
    </div>
  );
};

export default ImageUpload;
