// components/DownloadFile.tsx
"use client";

import React, { useState } from "react";
import { getUrl } from "aws-amplify/storage";

const DownloadFile: React.FC = () => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const fetchDownloadUrl = async () => {
    if (!fileName) return;

    setLoading(true);
    try {
      const linkToStorageFile = await getUrl({
        path: fileName,
        options: {
          validateObjectExistence: false, // defaults to false
          expiresIn: 20, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
        },
      });

      console.log("signed URL: ", linkToStorageFile.url);
      console.log("URL expires at: ", linkToStorageFile.expiresAt);
      setDownloadUrl(linkToStorageFile.url);

      // Send the URL to the Lambda function
      await fetch(
        "https://ls3ub6ffjsb73negpnygqcelmq0calvk.lambda-url.eu-west-3.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: downloadUrl,
        }
      );
    } catch (error) {
      console.error("Error getting download URL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={handleInputChange}
      />
      <button onClick={fetchDownloadUrl} disabled={loading || !fileName}>
        {loading ? "Loading..." : "Get Download Link"}
      </button>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={fileName}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download File
        </a>
      )}
    </div>
  );
};

export default DownloadFile;
