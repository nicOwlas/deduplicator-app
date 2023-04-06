// components/ImageGallery.tsx

import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { ElectronAPI } from "../ElectronAPI";
import ImageThumbnail from "./ImageThumbnail";

export interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const handleHeicConversionRequired = async (src: string): Promise<Blob> => {
    const electronAPI = (window as any).electronAPI as ElectronAPI;
    const convertedBuffer = await electronAPI.invoke("convert-heic", src);

    const blob = new Blob([convertedBuffer], {
      type: "image/jpeg",
    });
    return blob;
  };

  return (
    <Box width="100%" padding="1rem">
      <SimpleGrid columns={{ base: 3, sm: 4, md: 6, lg: 7 }} spacing="1rem">
        {images.map((image) => (
          <ImageThumbnail
            src={image}
            alt={`Thumbnail of ${image}`}
            width={150}
            height={150}
            onHeicConversionRequired={handleHeicConversionRequired}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ImageGallery;
