// components/FileList.tsx
import React from "react";
import styles from "./FileList.module.css";
const path = require("path");

interface FileListProps {
  paths: string[];
  directoryPath: string;
}

const FileList: React.FC<FileListProps> = ({ paths, directoryPath }) => {
  return (
    <div>
      <h2>Files with the same hash:</h2>
      <div className={styles.thumbnailContainer}>
        {paths.map((filePath, index) => {
          return (
            <div key={index} className={styles.thumbnail}>
              <img
                src={path.join("file://", directoryPath, filePath)}
                alt={filePath}
                className={styles.image}
              />
              <div className={styles.imageCaption}>{filePath}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileList;
