import React, { ChangeEvent } from "react";

interface FileUploadProps {
  onFileSelect: (json: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string);
          onFileSelect(json);
        } catch (err) {
          console.log(err);
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <input
      type="file"
      id="file-input"
      accept=".json"
      onChange={handleFileInputChange}
    />
  );
};

export default FileUpload;
