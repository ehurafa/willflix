import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer.tsx'
import VideoPlayerv2 from '../components/VideoPlayerv2.tsx'

const Videos: React.FC = () => {

  const url = '../video.mp4'

  return (
    <div>
        <VideoPlayerv2 src={url} poster="URL_DA_IMAGEM_DE_POSTER.jpg" />
    </div>
  );
};

export default Videos;
