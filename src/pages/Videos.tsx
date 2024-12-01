import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ReactHlsPlayer from 'react-hls-player'
import VideoPlayerv2 from '../components/VideoPlayerv2.tsx'

const Videos: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const playerRef = useRef(null);

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


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {videoSrc ? (
        // <VideoPlayerv2 src={videoSrc} poster="URL_DA_IMAGEM_DE_POSTER.jpg" />
      <ReactHlsPlayer
      ref={playerRef}
      onMediaAttaching={() => console.log("Video started")}
      src={videoSrc}
      autoPlay={false}
      controls={true}
      width="100%"
      height="auto"
    />
      ) : (
      <p>Carregando vídeo...</p>
      )}
      </div>
  );
};

export default Videos;
