'use client';

import React, { useRef, useState } from 'react';
import classes from './imagePicker.module.css';
import Image from 'next/image';

type ImagePickerProp = {
  label: string;
  name: string;
  error: string;
};
const ImagePicker: React.FC<ImagePickerProp> = ({ label, name, error }) => {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(
    null,
  );

  const handleImageClick = (): void => {
    // Accessing the input field using useRef hook on clicking the button
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files![0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    // After the file read is complted the result will be stored in the fileReader.result. How it will understand that the file reading
    // is completed ==> Ref : https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
    fileReader.onload = () => {
      //   console.log(fileReader.result);

      // The data URL is kept inside the state which will be placed in the src of the Image.
      setPickedImage(fileReader.result);
    };
    //  It is used to start reading the contents of the specified Blob or File. When the read operation is finished, data: URL
    // representing the file's data will be kept in the fileReader.result property.
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage as string} alt="Picked Image" fill />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          className={classes.input} // This will hide the input field. And the button will be shown to the user. To access the input field,
          // we will be using a useRef hook.
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg" // Accepting only png and jpeg type of image
          ref={imageInput} // For useRef hook
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          onClick={handleImageClick}
          type="button" // If you don't specify anything the type will be submit by default, and will submit the form surrounding it.
          // Here imagePicker.tsx is imported in the form in share/page.tsx. So, if the type is not specified, the form will be submitted.
        >
          Pick an Image
        </button>
      </div>
      <b style={{ color: 'red' }}>{error}</b>
    </div>
  );
};

export default ImagePicker;
