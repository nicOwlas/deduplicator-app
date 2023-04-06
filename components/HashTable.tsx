// components/ImageTable.tsx
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ElectronAPI } from "../ElectronAPI";
import ImageThumbnail from "./ImageThumbnail";

export interface GroupedImages {
  [hash: string]: string[];
}

export interface HashTableProps {
  data: GroupedImages;
}

const HashTable = ({ data }: HashTableProps) => {
  const handleHeicConversionRequired = async (src: string): Promise<Blob> => {
    const electronAPI = (window as any).electronAPI as ElectronAPI; // Add this line
    const convertedBuffer = await electronAPI.invoke("convert-heic", src); // Update this line

    const blob = new Blob([convertedBuffer], {
      type: "image/jpeg",
    });
    return blob;
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th>Hash</Th>
          <Th>Count of Files</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.entries(data).map(([hash, filePaths], index) => (
          <Tr key={hash}>
            <Td>{index + 1}</Td>
            <Td>
              <ImageThumbnail
                src={filePaths[0]}
                alt={`Thumbnail of ${filePaths[0]}`}
                width={50}
                height={50}
                onHeicConversionRequired={handleHeicConversionRequired}
              />
            </Td>
            <Td>{hash}</Td>
            <Td>{filePaths.length}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default HashTable;
