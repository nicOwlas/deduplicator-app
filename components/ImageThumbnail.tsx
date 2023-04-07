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
  interactive?: boolean;
  isSelected?: boolean;
  onSelect?: (src: string, selected: boolean) => void;
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
  interactive = true,
  isSelected = false,
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

  const handleMouseEnter = () => {
    if (interactive) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setIsHovered(false);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (interactive && onSelect) {
      onSelect(src, e.target.checked);
    }
  };

  const textColor = useColorModeValue("white", "gray.800");
  const overlayColor = useColorModeValue(
    "rgba(0, 0, 0, 0.5)",
    "rgba(255, 255, 255, 0.5)"
  );

  return (
    <Box
      position="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imageSrc}
        alt={alt}
        objectFit="cover"
        width={width}
        height={height}
        filter={showOverlay ? "brightness(50%)" : undefined}
        borderRadius="lg"
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
            onChange={handleSelect}
            colorScheme="white"
          >
            <VisuallyHidden>
              {" "}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleSelect}
              />
            </VisuallyHidden>
          </Checkbox>
          <Text
            color="white"
            fontSize="xs"
            fontWeight="bold"
            textAlign="left"
            maxW={`${width - 2 * 8}px`} // 2 * 4 accounts for the padding
            wordBreak="break-word"
            noOfLines={6} // Limit the number of lines displayed
          >
            {alt}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ImageThumbnail;
