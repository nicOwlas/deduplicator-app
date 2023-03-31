// components/ImageTable.tsx
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import GroupRow from "./GroupRow";
import ImageThumbnail from "./ImageThumbnail";
interface ImageData {
  id: number;
  thumbnail: string;
  path: string;
  hash: string;
}

export interface ImageTableProps {
  images: ImageData[];
}

const groupByHash = (images: ImageData[]): Record<string, ImageData[]> => {
  return images.reduce((acc, image) => {
    if (!acc[image.hash]) {
      acc[image.hash] = [];
    }
    acc[image.hash].push(image);
    return acc;
  }, {} as Record<string, ImageData[]>);
};

const ImageTable: React.FC<ImageTableProps> = ({ images }) => {
  const groupedImages = groupByHash(images);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    () => {
      return Object.keys(groupedImages).reduce((acc, hash) => {
        acc[hash] = false;
        return acc;
      }, {} as Record<string, boolean>);
    }
  );

  const toggleGroup = (hash: string) => {
    setExpandedGroups({ ...expandedGroups, [hash]: !expandedGroups[hash] });
  };

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Row Index</Th>
            <Th>Image Thumbnail</Th>
            <Th>Image Path</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(groupedImages).map((hash) => (
            <>
              <GroupRow hash={hash} onClick={() => toggleGroup(hash)} />
              {expandedGroups[hash] &&
                groupedImages[hash].map((image, index) => (
                  <Tr key={image.id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <ImageThumbnail
                        src={image.thumbnail}
                        alt={`Thumbnail of ${image.path}`}
                        width={50}
                        height={50}
                        onHeicConversionRequired={async (src) => {
                          const convertedBuffer =
                            await window.electronAPI.invoke(
                              "convert-heic",
                              src
                            );

                          const blob = new Blob([convertedBuffer], {
                            type: "image/jpeg",
                          });
                          return blob;
                        }}
                      />
                      {/* <Image
                        src={image.thumbnail}
                        alt={`Thumbnail of ${image.path}`}
                      /> */}
                    </Td>
                    <Td>{image.path}</Td>
                  </Tr>
                ))}
            </>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ImageTable;
