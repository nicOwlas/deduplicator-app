// components/FileList.tsx
import React from "react";

interface FileListProps {
  paths: string[];
  directoryPath: string;
}

const FileList: React.FC<FileListProps> = ({ paths, directoryPath }) => {
  return (
    <div>
      <h2>Files with the same hash:</h2>
      <ul>
        {paths.map((path, index) => (
          <li key={index}>
            {directoryPath}/{path}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
