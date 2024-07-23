// app/uploader/uploadButton/FileUploader.tsx
"use client";

import React, { useState } from "react";

import { StorageManager } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";

const FileUploader = () => {
  return (
    <StorageManager
      acceptedFileTypes={["image/*"]}
      path="picture-submissions/"
      maxFileCount={1}
    />
  );
};

export default FileUploader;
