// components/FileList.tsx
import React from "react";

interface FileListProps {
  paths: string[];
}

const FileList: React.FC<FileListProps> = ({ paths }) => {
  return (
    <div>
      <h2>Files with the same hash:</h2>
      <ul>
        {paths.map((path, index) => (
          <li key={index}>{path}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
