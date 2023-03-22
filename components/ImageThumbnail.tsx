import React from "react";

export interface ImageThumbnailProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      <img
        src={src}
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
