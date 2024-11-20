import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer.tsx'
import VideoPlayerv2 from '../components/VideoPlayerv2.tsx'

const Videos: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/videos/1', {
          responseType: 'blob',
        });
        const videoUrl = URL.createObjectURL(response.data);
        setVideoSrc(videoUrl);
      } catch (err) {
        setError('Erro ao carregar o vídeo');
      }
    };

    fetchVideo();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
       {videoSrc ? (
        <VideoPlayerv2 src={videoSrc} poster="URL_DA_IMAGEM_DE_POSTER.jpg" />
       ) : (
        <p>Carregando vídeo...</p>
      )}
        
    </div>
  );
};

export default Videos;
