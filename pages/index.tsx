// pages/index.tsx
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [filePath, setFilePath] = useState("");
  const [jsonData, setJsonData] = useState({});
  const [hashes, setHashes] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("deduplicatorData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setHashes(Object.keys(data));
    }
  }, []);

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
          setJsonData(parsedJson);
          localStorage.setItem("deduplicatorData", reader.result as string);
        };
        reader.readAsText(selectedFile);
      }
    });
    fileInput.click();
  };

  return (
    <div>
      <h1>Deduplicator app</h1>
      <p>Select a JSON file:</p>
      {hashes.length ? (
        hashes.map((hash) => (
          <Link key={hash} href={`/files/${hash}`}>
            <div>{hash}</div>
          </Link>
        ))
      ) : (
        <button onClick={handleSelectFile}>Select File</button>
      )}
    </div>
  );
};

export default Home;
