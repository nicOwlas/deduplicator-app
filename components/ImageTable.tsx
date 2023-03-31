// components/ImageTable.tsx
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import GroupRow from "./GroupRow";
import ImageThumbnail from "./ImageThumbnail";

export interface GroupedImages {
  [hash: string]: string[];
}

interface ImageTableProps {
  data: GroupedImages;
}

const ImageTable = ({ data }: ImageTableProps) => {
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const groups = Object.keys(data);
    const collapsed = groups.reduce((acc, group) => {
      acc[group] = false;
      return acc;
    }, {});
    return collapsed;
  });

  const toggleGroup = (hash: string) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [hash]: !prevState[hash],
    }));
  };

  let rowIndex = 1;

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Thumbnail</Th>
            <Th>Path</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(data).map((hash) => (
            <>
              <GroupRow
                hash={hash}
                onClick={() => toggleGroup(hash)}
                isExpanded={expandedGroups[hash]}
              />
              {data[hash].map((path, index) => {
                const currentIndex = rowIndex;
                rowIndex++;
                return expandedGroups[hash] ? (
                  <Tr key={`${hash}-${path}-${currentIndex}`}>
                    <Td>{currentIndex}</Td>
                    <Td>
                      <ImageThumbnail
                        src={path}
                        alt={`Thumbnail of ${path}`}
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
                    </Td>
                    <Td>{path}</Td>
                  </Tr>
                ) : null;
              })}
            </>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ImageTable;
