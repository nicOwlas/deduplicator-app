import {
  Box,
  Checkbox,
  Image,
  Text,
  VisuallyHidden,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export interface ImageThumbnailProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isSelected?: boolean;
  onSelect: (src: string, selected: boolean) => void;
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
  isSelected,
  onSelect,
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

  const [isHovered, setIsHovered] = useState(false);

  const showOverlay = isSelected || isHovered;

  const textColor = useColorModeValue("white", "gray.800");
  const overlayColor = useColorModeValue(
    "rgba(0, 0, 0, 0.5)",
    "rgba(255, 255, 255, 0.5)"
  );

  return (
    <Box
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageSrc}
        alt={alt}
        objectFit="cover"
        width={width}
        height={height}
        filter={showOverlay ? "brightness(50%)" : undefined}
      />
      {showOverlay && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          p={2}
        >
          <Checkbox
            isChecked={isSelected}
            size="lg"
            onChange={(e) => onSelect(src, e.target.checked)}
          >
            <VisuallyHidden>
              {" "}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onSelect(src, e.target.checked)}
              />
            </VisuallyHidden>
          </Checkbox>
          <Text
            color="white"
            fontSize="sm"
            fontWeight="bold"
            textAlign="left"
            maxW="100%"
            wordBreak="break-word"
          >
            {alt}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ImageThumbnail;
