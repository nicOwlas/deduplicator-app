// pages/index.tsx
import { useEffect, useState } from "react";
import JsonTable from "../components/JsonTable";
import styles from "../styles/index.module.css";

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
    if ("showDirectoryPicker" in window) {
      try {
        const directoryHandle = await (window as any).showDirectoryPicker();
        localStorage.setItem("directoryPath", directoryHandle.name);
        setDirectoryPath(directoryHandle.name);
      } catch (err) {
        console.error("Error selecting directory:", err);
      }
    } else {
      alert("Your browser does not support directory selection.");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>👯‍♀️ Deduplicator</h1>
        <div className={styles.hashList}>
          {hashes.length ? (
            <>
              <button onClick={handleSelectDirectory}>Select Directory</button>
              <button onClick={handleReset}>Reset</button>
              <JsonTable
                data={JSON.parse(
                  localStorage.getItem("deduplicatorData") || "{}"
                )}
                directoryPath={directoryPath}
              />
            </>
          ) : (
            <button onClick={handleSelectFile}>Select JSON File</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
