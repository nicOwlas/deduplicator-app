// pages/index.tsx
import { Button, Container, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HashTable from "../components/HashTable";
// import styles from "../styles/index.module.css";

const Home = () => {
  const [filePath, setFilePath] = useState("");
  const [hashes, setHashes] = useState<string[]>([]);
  const [directoryPath, setDirectoryPath] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("deduplicatorData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setHashes(Object.keys(data));
    }
  }, []);

  useEffect(() => {
    const storedDirectoryPath = localStorage.getItem("directoryPath");
    if (storedDirectoryPath) {
      setDirectoryPath(storedDirectoryPath);
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem("deduplicatorData");
    localStorage.removeItem("directoryPath");
    setFilePath("");
    setHashes([]);
  };

  const handleSelectFile = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.addEventListener("change", (event) => {
      const fileList = (event.target as HTMLInputElement).files;
      if (fileList?.length) {
        const selectedFile = fileList[0];
        setFilePath(selectedFile.name);
        const reader = new FileReader();
        reader.onload = () => {
          const parsedJson = JSON.parse(reader.result as string);
          setHashes(Object.keys(parsedJson));
          localStorage.setItem("deduplicatorData", reader.result as string);
        };
        reader.readAsText(selectedFile);
      }
    });
    fileInput.click();
  };

  const handleSelectDirectory = async () => {
    try {
      const fullPath = await window.electronAPI.showDirectoryPicker();
      if (fullPath) {
        const oldData = JSON.parse(
          localStorage.getItem("deduplicatorData") || "{}"
        );
        const newData = {};

        for (const hash in oldData) {
          newData[hash] = oldData[hash].map((path) => {
            return `${fullPath}/${path}`;
          });
        }

        localStorage.setItem("directoryPath", fullPath);
        setDirectoryPath(fullPath);

        localStorage.setItem("deduplicatorData", JSON.stringify(newData));
        setHashes(Object.keys(newData));
      }
    } catch (err) {
      console.error("Error selecting directory:", err);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl">
          👯‍♀️ Deduplicator
        </Heading>
        <VStack align="start" w="100%">
          {hashes.length ? (
            <>
              <HStack spacing={4}>
                <Button
                  onClick={handleSelectDirectory}
                  variant="outline"
                  size="md"
                >
                  Select Directory
                </Button>
                <Button onClick={handleReset} variant="outline" size="md">
                  Reset
                </Button>
              </HStack>
              <HashTable
                data={JSON.parse(
                  localStorage.getItem("deduplicatorData") || "{}"
                )}
              />
            </>
          ) : (
            <Button onClick={handleSelectFile} variant="outline" size="md">
              Select JSON File
            </Button>
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Home;
