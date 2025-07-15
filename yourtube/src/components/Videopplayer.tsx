"use client";

import { useRef } from "react";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepath: string;
  };
}

const backendURL = process.env.BACKEND_URL!;

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = `${backendURL}/${video.filepath.replace(/\\/g, "/")}`;

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay
        muted
        poster={`/placeholder.svg?height=480&width=854`}
      >
        <source
          src={videoSrc}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
