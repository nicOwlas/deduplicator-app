import React, { useEffect, useState } from "react";

export interface ImageThumbnailProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onHeicConversionRequired?: (src: string) => Promise<Blob>;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  alt,
  width,
  height,
  onHeicConversionRequired,
}) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function convertHeic(src: string) {
      if (onHeicConversionRequired) {
        try {
          const convertedBlob = await onHeicConversionRequired(src);
          setImageSrc(URL.createObjectURL(convertedBlob));
        } catch (error) {
          console.error("Error converting HEIC file:", error);
        }
      }
    }

    if (src) {
      if (src.endsWith(".heic") || src.endsWith(".HEIC")) {
        convertHeic(src);
      } else {
        setImageSrc(src);
      }
    }
  }, [src, onHeicConversionRequired]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
          margin: "auto",
        }}
      />
    </div>
  );
};

export default ImageThumbnail;
