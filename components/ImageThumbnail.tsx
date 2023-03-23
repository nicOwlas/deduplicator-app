import React, { useEffect, useState } from "react";

export interface ImageThumbnailProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onHeicConversionRequired?: (src: string) => Promise<Blob>;
}

// Check if src is an online or local file
function isValidURL(src) {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(src);
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
      const extension = src.split(".").pop()?.toLowerCase();
      console.log(extension);
      if (extension === "heic") {
        console.log("HEIC image:", src);
        convertHeic(src);
      } else {
        setImageSrc(isValidURL(src) ? src : "file://" + src);
      }
    }
  }, [src, onHeicConversionRequired]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <img
        src={imageSrc}
        alt={imageSrc}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
          margin: "auto",
        }}
      />
      <div>{"Caption: " + imageSrc}</div>{" "}
      {/* Add this div to display the caption */}
    </div>
  );
};

export default ImageThumbnail;
