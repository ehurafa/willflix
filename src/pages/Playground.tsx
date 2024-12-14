import React, { useEffect, useState } from 'react'
import VideoPlayerHSL from '../components/VideoPlayerHSL.tsx'
import VideoList from '../components/VideoList.tsx'
import { useParams } from 'react-router-dom'
import thumbnail from '@root/assets/daima.jpg'


const Playground: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>('')
  // const [error, setError] = useState<string | null>(null)

  const { id, category } = useParams<{ id: string, category: string }>()

  console.log('category ', category)

  const cardsData = [
    {
      id: 1,
      title: 'Card 1',
      thumbnail,
      link: '/videos/animes/dragonball-daima/01/ep1',
    },
    {
      id: 2,
      title: 'Card 2',
      thumbnail,
      link: '/videos/animes/dragonball-daima/01/ep2',
    },
    {
      id: 3,
      title: 'Card 3',
      thumbnail,
      link: '/videos/animes/dragonball-daima/01/ep3',
    },
    {
      id: 4,
      title: 'Card 4',
      thumbnail,
      link: '/videos/animes/dragonball-daima/01/ep4',
    },
  ]

  useEffect(() => {
    const fetchVideo = async () => {
      /* try {
        await axios.get('/api/videos/video-hls/BigBuckBunny.m3u8')
        setVideoSrc('/api/videos/video-hls/BigBuckBunny.m3u8')
      } catch (err) {
        setError('Erro ao carregar o vídeo')
      } */
        setVideoSrc(`/api/videos/animes/dragonball-daima/${id}/Dragon-Ball-Daima-Legendado.m3u8`)
    };

    fetchVideo();
  }, [id]);

  /* if (error) {
    return <div>{error}</div>;
  } */

  return (
      <>
        <div>
          {videoSrc ? (
            <VideoPlayerHSL
            src={videoSrc}
          />
          ) : (
          <p>Carregando vídeo...</p>
          )}
        </div>      
        <VideoList cards={cardsData} />
      </>
  );
};

export default Playground;
