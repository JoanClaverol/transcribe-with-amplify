"use client";

import FileUploader from "./uploadButton/page";

export default function UploaderBox() {
  return (
    <div>
      <FileUploader onFileSelect={(file) => console.log(file)} />
    </div>
  );
}
