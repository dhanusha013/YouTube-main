"use client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useUser } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";



export default function VideoCard({ video }: any) {

    const {user} = useUser();

 const increasePoints = async () => {
  if (!user || !user.email) {
    console.log("User not loaded or email is undefined");
    return;
  }

  try {
    console.log("Increasing points for:", user.email);
    await axiosInstance.post('/video/increasePoints', {
      email: user.email
    });
  } catch (error) {
    console.log("Error in increasePoints:", error);
  }
};

  const backendURL = "https://you-tube-pink-omega.vercel.app";
  const videoSrc = `${backendURL}/${video?.filepath.replace(/\\/g, "/")}`;

  return (
    <Link href={`/watch/${video?._id}`} className="group"  onClick={increasePoints}>
      <div className="space-y-3">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
         <video
          src={video.filepath}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full rounded-md"
        />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
            10:24
          </div>
        </div>
        <div className="flex gap-3">
          <Avatar className="w-9 h-9 flex-shrink-0">
            <AvatarFallback>{video?.videochanel[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
              {video?.videotitle}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{video?.videochanel}</p>
            <p className="text-sm text-gray-600">
              {video?.views.toLocaleString()} views •{" "}
              {formatDistanceToNow(new Date(video?.createdAt))} ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
