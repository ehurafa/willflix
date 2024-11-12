import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer.tsx'

const Videos: React.FC = () => {
  const videos = [
    { id: 1, title: 'Video 1', thumbnail: '/thumb1.jpg', videoUrl: '/videos/video1.mp4' },
    { id: 2, title: 'Video 2', thumbnail: '/thumb2.jpg', videoUrl: '/videos/video2.mp4' },
  ];

  const url = '../video.mp4'

  return (
    <div>
  
        <VideoPlayer video={url} />
  
    </div>
  );
};

export default Videos;
