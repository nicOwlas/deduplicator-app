// pages/details/[hash].tsx
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ImageGallery from "../../components/ImageGallery";

const HashFiles: React.FC = () => {
  const router = useRouter();
  const { hash } = router.query;
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  useEffect(() => {
    if (hash) {
      const data = JSON.parse(localStorage.getItem("deduplicatorData") || "{}");
      const pathsForHash = data[hash as keyof typeof data] || [];
      const imagePathsForHash = pathsForHash
        .filter((path) => {
          const extension = path.split(".").pop()?.toLowerCase();
          return (
            extension === "jpg" ||
            extension === "jpeg" ||
            extension === "png" ||
            extension === "heic"
          );
        })
        .map((path) => {
          return path;
        });
      setImagePaths(imagePathsForHash);
    }
  }, [hash]);

  const bg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.400", "gray.200");

  return (
    <Box bg={bg} minH="100vh">
      <Container maxW="container.xl" py={32}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="lg">
            <VStack>
              <Text color={textColor}>Hash</Text>
              <Text isTruncated maxWidth="100%">
                {hash}
              </Text>
            </VStack>
          </Heading>
          <HStack justify="flex-start">
            <Link href="/" passHref>
              <Button variant="outline" as="a" bg="white" py="2">
                Go Back
              </Button>
            </Link>
          </HStack>
          {imagePaths.length > 0 && <ImageGallery images={imagePaths} />}
          {imagePaths.length === 0 && (
            <Text fontSize="lg" color={textColor}>
              No images found for this hash.
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default HashFiles;
