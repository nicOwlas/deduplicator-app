// components/GroupRow.tsx
import { Td, Text, Tr } from "@chakra-ui/react";

export interface GroupRowProps {
  hash: string;
  onClick: () => void;
}

const GroupRow: React.FC<GroupRowProps> = ({ hash, onClick }) => {
  return (
    <Tr onClick={onClick} _hover={{ bg: "gray.100", cursor: "pointer" }}>
      <Td colSpan={3}>
        <Text fontWeight="bold">Group: {hash}</Text>
      </Td>
    </Tr>
  );
};

export default GroupRow;
