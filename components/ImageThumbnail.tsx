import { AspectRatio, Image } from "@chakra-ui/react";
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
    async function loadImage() {
      if (src) {
        const fileUrl = isValidURL(src) ? src : "file://" + src;
        const extension = src.split(".").pop()?.toLowerCase();

        if (extension === "heic") {
          if (onHeicConversionRequired) {
            try {
              const convertedBlob = await onHeicConversionRequired(src);
              setImageSrc(URL.createObjectURL(convertedBlob));
            } catch (error) {
              console.error("Error converting HEIC file:", error);
            }
          }
        } else {
          try {
            const { format, buffer } = await window.electronAPI.invoke(
              "extract-thumbnail",
              src
            );
            if (buffer) {
              console.log("Succeeded extracting Thumbnail of :", src);
              setImageSrc(
                URL.createObjectURL(
                  new Blob([buffer], { type: `image/${format}` })
                )
              );
            } else {
              setImageSrc(fileUrl);
            }
          } catch (error) {
            console.error("Error extracting embedded thumbnail:", error);
            setImageSrc(fileUrl); // Use original image file when extraction fails
          }
        }
      }
    }

    loadImage();
  }, [src, onHeicConversionRequired]);

  return (
    <AspectRatio
      width={width}
      height={height}
      ratio={width && height ? width / height : 1}
    >
      <Image
        src={imageSrc}
        borderRadius="md"
        alt={alt}
        fallbackSrc="https://via.placeholder.com/150"
        objectFit="cover"
      />
    </AspectRatio>
  );
};

export default ImageThumbnail;
