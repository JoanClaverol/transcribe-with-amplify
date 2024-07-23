"use client";

import { useState, useRef } from "react";
import { uploadData } from "aws-amplify/storage";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";

type MediaRecorderType = MediaRecorder | null;

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const mediaRecorder = useRef<MediaRecorderType>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [currentBlob, setCurrentBlob] = useState<Blob | null>(null);

  const uploadChunk = async (chunk: Blob) => {
    try {
      const result = await uploadData({
        path: `picture-submissions/${Date.now()}.mp3`,
        data: chunk,
      });
      console.log("Succeeded: ", result);
      console.log("Chunk uploaded: ", result);
    } catch (error) {
      console.error("Error uploading chunk: ", error);
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      // Clear the chunks array at the start of a new recording
      audioChunks.current = [];

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = async (e) => {
          audioChunks.current.push(e.data);
          setCurrentBlob(new Blob(audioChunks.current, { type: "audio/wav" }));
          await uploadChunk(e.data);
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          console.log("Audio URL: ", audioUrl); // Debug: Log the audio URL
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing the microphone: ", error);
        alert(
          "Error accessing the microphone. Please check your browser settings."
        );
      }
    } else {
      mediaRecorder.current?.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button id="toggleRecording" onClick={toggleRecording}>
        {isRecording ? "Detener Grabación" : "Comenzar Grabación"}
      </button>
      {audioURL && (
        <audio
          id="audioElement"
          src={audioURL}
          controls
          style={{ display: "block" }}
        />
      )}
      <StorageManager path="audio-recordings/" maxFileCount={1} isResumable />
      <button
        id="sendRecording"
        onClick={() => uploadChunk(currentBlob)}
        style={{ display: audioURL ? "block" : "none" }}
      >
        Enviar Grabación
      </button>
    </div>
  );
};

export default AudioRecorder;
