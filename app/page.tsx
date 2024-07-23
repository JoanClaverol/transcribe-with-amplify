"use client";

import UploaderBox from "./uploader/page";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import DisplayS3Files from "./showS3Files/page";
import AudioRecorder from "./recorder/page";
import DownloadFile from "./downloader/page";

Amplify.configure(outputs);

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="justify-center">
          <h1>Start of the app</h1>
          <AudioRecorder />
          <DisplayS3Files />
          <DownloadFile />
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
