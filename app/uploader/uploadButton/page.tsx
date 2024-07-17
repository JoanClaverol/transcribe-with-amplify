"use client";

import React, { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import path from "path";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
      onFileSelect(file);
    }
  };

  const handleUpload = () => {
    if (file) {
      uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
      });
    } else {
      console.error("No file selected for upload.");
    }
  };

  return (
    <div>
      <label>
        <div>
          <p>
            {fileName
              ? fileName
              : "Drag and drop a file here or click to select"}
          </p>
        </div>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
      <button onClick={handleUpload}>Upload file</button>
    </div>
  );
};

export default FileUploader;
