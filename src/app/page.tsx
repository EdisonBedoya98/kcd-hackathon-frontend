"use client";
import { Form } from "@/components/form";
import { FullScreenLoading } from "@/components/loading-full-screen";
import { PatientComponent } from "@/components/patient-info";
import { Patient } from "@/interfaces/interfaces";
import React, { useRef, useState } from "react";

const url =
  "https://d7e7-2803-1800-400b-3161-8d35-e62-6859-455a.ngrok-free.app/records";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900">
      <div>
        <span className="text-4xl font-bold text-center text-gray-900 dark:text-white uppercase">
          Powered By Auco.team
        </span>
      </div>

      <div className="relative flex place-items-center  before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <CameraComponent />
      </div>
    </main>
  );
}

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [currentView, setCurrentView] = useState<"userInfo" | "userForm">(
    "userInfo"
  );

  const startCamera = async () => {
    setCurrentView("userInfo");
    setPhotoData(null);
    setPatientData(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    setPhotoData(null);
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        console.log("🚀 ~ file: page.tsx:66 ~ takePhoto ~ dataUrl:", dataUrl);
        setPhotoData(dataUrl);
      }
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());
    }
  };

  const sendPhoto = () => {
    setIsLoading(true);
    const data = {
      image: photoData?.split(",")[1],
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json() as Promise<Patient>;
      })
      .then((responseData) => {
        // Process the response data here
        console.log(responseData);
        setPatientData(responseData);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };
  const createRegister = (message: string) => {
    console.log("validate");
    setIsLoading(true);
    const data = {
      physician: "647ede8746bf470a1a36192c",
      message: message,
    };

    fetch(`${url}/${patientData?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((responseData) => {
        // Process the response data here
        console.log(responseData);
        alert("Register created successfully");
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="grid gap-3">
      <div className="flex gap-x-2 ">
        <button onClick={startCamera} className="bg-gray-300 p-2 rounded-lg">
          Start Camera
        </button>
        <button onClick={stopCamera} className="bg-gray-300 p-2 rounded-lg">
          Stop Camera
        </button>
        <button onClick={takePhoto} className="bg-gray-300 p-2 rounded-lg">
          Take Photo
        </button>
        <button
          onClick={sendPhoto}
          className="bg-gray-300 p-2 rounded-lg disabled:bg-gray-400"
          disabled={!photoData}
        >
          Validate
        </button>
        <button
          onClick={() => {
            setCurrentView("userForm");
          }}
          className="bg-gray-300 p-2 rounded-lg disabled:bg-gray-400"
          disabled={!patientData}
        >
          Create Register
        </button>
      </div>

      {currentView === "userInfo" && photoData ? (
        <img src={photoData} alt="Captured Photo" />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          className="rounded-lg shadow-2xl"
        ></video>
      )}
      {patientData && currentView === "userInfo" && (
        <PatientComponent data={patientData} />
      )}
      {currentView === "userForm" && <Form onSubmit={createRegister} />}
      {isLoading && <FullScreenLoading />}
    </div>
  );
};
