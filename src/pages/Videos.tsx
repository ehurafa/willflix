import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ReactHlsPlayer from 'react-hls-player'
import VideoPlayerHSL from '../components/VideoPlayerHSL.tsx'

const Videos: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleUpdateTime = (e: number) =>  {
    console.log('e ', e)
  }


  useEffect(() => {
    const fetchVideo = async () => {
      try {
        await axios.get('/api/videos/video-hls/BigBuckBunny.m3u8');
        setVideoSrc('/api/videos/video-hls/BigBuckBunny.m3u8');
      } catch (err) {
        setError('Erro ao carregar o vídeo');
      }
    };

    fetchVideo();
  }, []);

  useEffect(() => {
    const player = playerRef.current;

    if (!player) return;

    const handleTimeUpdate = () => {
      setCurrentTime(player.currentTime); // Atualiza o estado com o tempo atual do vídeo
    };

    player.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      player.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {videoSrc ? (
        // <VideoPlayerv2 src={videoSrc} poster="URL_DA_IMAGEM_DE_POSTER.jpg" />

      <>
            <p>Tempo Atual: {currentTime.toFixed(2)} segundos</p>
      <VideoPlayerHSL
      onTimeUpdate={(e: number) => handleUpdateTime(e) }
      src={videoSrc}

    />
      
      </>
      ) : (
      <p>Carregando vídeo...</p>
      )}
      </div>
  );
};

export default Videos;
