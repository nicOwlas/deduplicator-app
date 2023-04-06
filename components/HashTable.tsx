// components/HashTable.tsx
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ElectronAPI } from "../ElectronAPI";
import ImageThumbnail from "./ImageThumbnail";
export interface GroupedImages {
  [hash: string]: string[];
}

export interface HashTableProps {
  data: GroupedImages;
}

const HashTable = ({ data }: HashTableProps) => {
  const router = useRouter();
  const handleHeicConversionRequired = async (src: string): Promise<Blob> => {
    const electronAPI = (window as any).electronAPI as ElectronAPI;
    const convertedBuffer = await electronAPI.invoke("convert-heic", src);

    const blob = new Blob([convertedBuffer], {
      type: "image/jpeg",
    });
    return blob;
  };

  return (
    <Box bg="white" width="100%">
      <Table variant="simple">
        <Thead bg="gray.50">
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th>No of Images</Th>
            <Th>Hash</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(data).map(([hash, filePaths], index) => (
            <Tr
              key={hash}
              cursor="pointer"
              _hover={{ backgroundColor: "gray.200" }}
              onClick={() => router.push(`/details/${hash}`)}
            >
              <Td>
                <Text color="gray.500">{index + 1}</Text>
              </Td>
              <Td>
                <ImageThumbnail
                  src={filePaths[0]}
                  alt={`Thumbnail of ${filePaths[0]}`}
                  width={50}
                  height={50}
                  onHeicConversionRequired={handleHeicConversionRequired}
                />
              </Td>
              <Td>{filePaths.length}</Td>
              <Td>
                {/* <Link href={`/details/${hash}`} passHref> */}
                {hash}
                {/* </Link> */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default HashTable;
