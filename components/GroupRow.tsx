// components/GroupRow.tsx
import { HStack, Text, Tr, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface GroupRowProps {
  hash: string;
  onClick: () => void;
}
const router = useRouter();
const GroupRow = ({ hash, onClick }: GroupRowProps) => {
  return (
    <Tr
      key={hash}
      onClick={() => router.push(`/detail/${hash}`)}
      cursor="pointer"
      _hover={{ backgroundColor: "gray.100" }}
    >
      <HStack spacing={4}>
        <VStack alignItems="flex-start">
          <Text fontSize="sm" color="gray.200">
            HASH
          </Text>
          <Text fontSize="md" color="gray.400">
            {hash}
          </Text>
        </VStack>
      </HStack>
    </Tr>
  );
};

export default GroupRow;
