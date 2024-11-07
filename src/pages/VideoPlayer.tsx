import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const videos = {
    1: '/videos/video1.mp4',
    2: '/videos/video2.mp4',
  };

  const videoUrl = videos[parseInt(id!)];

  return (
    <div>
      <video src={videoUrl} controls width="100%" />
    </div>
  );
};

export default VideoPlayer;
