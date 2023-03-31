// components/GroupRow.tsx
import { Button, HStack, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export interface GroupRowProps {
  hash: string;
  onClick: () => void;
  isExpanded: boolean;
}

const GroupRow = ({ hash, onClick, isExpanded }: GroupRowProps) => {
  const Icon = isExpanded ? FiChevronDown : FiChevronRight;

  return (
    <Tr>
      <Td colSpan={3}>
        <Button
          w="full"
          justifyContent="flex-start"
          variant="ghost"
          onClick={onClick}
          py={2}
        >
          <HStack spacing={4}>
            <Icon />
            <VStack alignItems="flex-start">
              <Text fontSize="sm" color="gray.200">
                HASH
              </Text>
              <Text fontSize="md" color="gray.400">
                {hash}
              </Text>
            </VStack>
          </HStack>
        </Button>
      </Td>
    </Tr>
  );
};

export default GroupRow;
