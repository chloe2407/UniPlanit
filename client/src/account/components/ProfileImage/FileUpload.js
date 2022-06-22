import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
export default function FileUpload({ handleFileUpload }) {
  const [img, setImg] = useState();
  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };
  return (
    <>
      <input
        type="file"
        id="image_uploads"
        onChange={(e) => handleFileChange(e)}
        accept="image/png"
      />
      <Button onClick={(e) => handleFileUpload(img)}>
        Upload Profile Photo
      </Button>
    </>
  );
}
