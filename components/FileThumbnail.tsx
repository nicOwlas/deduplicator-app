import heic2any from "heic2any";
import React, { useEffect, useState } from "react";

interface FileThumbnailProps {
  file: File;
  arrayBuffer: ArrayBuffer;
}

const FileThumbnail: React.FC<FileThumbnailProps> = ({ file }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(new Blob([arrayBuffer], { type: file.type }));

    reader.onload = async () => {
      let thumbnailBlob: any;
      console.log(file.type);
      if (file.type === "image/heif" || file.type === "image/heic") {
        const heicBlob = new Blob([reader.result as ArrayBuffer], {
          type: file.type,
        });
        thumbnailBlob = await heic2any({
          blob: heicBlob,
          toType: "image/jpeg",
          quality: 0.8,
        });
      } else {
        console.log("Non-HEIC/HEIF file detected");
        thumbnailBlob = new Blob([reader.result as ArrayBuffer], {
          type: file.type,
        });
      }

      const thumbnailSrc = URL.createObjectURL(thumbnailBlob);
      console.log("Thumbnail src:", thumbnailSrc);
      setThumbnailSrc(thumbnailSrc);
    };
    reader.onerror = () => {
      console.error("Error reading file:", reader.error);
    };
  }, [file, arrayBuffer]);

  return <img src={thumbnailSrc} alt={file.name} />;
};

export default FileThumbnail;
