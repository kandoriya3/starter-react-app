import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { removeBg } from 'remove.bg';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onDrop = acceptedFiles => {
    setImage(acceptedFiles[0]);
  };

  const removeBackground = async () => {
    const response = await removeBg(image, {
      apiKey: 'your-api-key-here',
    });
    setCroppedImage(response.data);
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop an image file here, or click to select a file</p>
            </div>
          </section>
        )}
      </Dropzone>
      {image && (
        <button onClick={removeBackground}>Remove background</button>
      )}
      {croppedImage && (
        <img src={croppedImage} alt="Cropped image" />
      )}
    </div>
  );
};

export default ImageUploader;
