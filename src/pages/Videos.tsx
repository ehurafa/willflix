import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer.tsx'

const Videos: React.FC = () => {

  const url = '../video.mp4'

  return (
    <div>  
        <VideoPlayer video={url} />
    </div>
  );
};

export default Videos;
