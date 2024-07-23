"use client";

import { list } from "aws-amplify/storage";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { useEffect, useState } from "react";

interface ListOutputItemWithPath {
  key: string;
  path: string;
}

export default function DisplayS3Files() {
  const [files, setFiles] = useState<ListOutputItemWithPath[]>([]); // Define state with the correct type

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await list({
          path: "audio-recordings/",
        });
        setFiles(result.items as ListOutputItemWithPath[]); // Cast result.items to the correct type
      } catch (error) {
        console.error("Error listing files: ", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Display files on S3 folder</h2>
      {files
        .filter((item) => !item.path.endsWith("/"))
        .map((item, index) => (
          <div key={item.key || index}>{item.path}</div>
        ))}
    </div>
  );
}
