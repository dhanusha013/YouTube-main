import Comments from "@/components/Comments";
import RelatedVideos from "@/components/RelatedVideos";
import VideoInfo from "@/components/VideoInfo";
import Videopplayer from "@/components/Videopplayer";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [videos, setVideo] = useState<any>(null);
  const [allVideos, setAllVideos] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id || typeof id !== "string") return;
      try {
        const res = await axiosInstance.get("/video/getall");
        const video = res.data?.find((vid: any) => vid._id === id);
        setVideo(video);
        setAllVideos(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleDownload = async (videoId: string) => {
    try {
      const token = localStorage.getItem("token"); // adjust if you store differently

      const res = await axiosInstance.post(
        `/video/download/${videoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      if (res.data.downloadUrl) {
        window.open(res.data.downloadUrl, "_blank");
      }
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message || "Error downloading. Please try again."
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!videos) {
    return <div>Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Videopplayer video={videos} />
            <VideoInfo video={videos} />

            {/* Download button */}
            <button
              onClick={() => handleDownload(videos._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Download
            </button>

            <Comments videoId={id as string} />
          </div>
          <div className="space-y-4">
            <RelatedVideos videos={allVideos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
