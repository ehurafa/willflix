import React, { useEffect, useRef } from 'react'
import shaka from 'shaka-player/dist/shaka-player.compiled'

interface ShakaPlayerProps {
  src: string;
  onTimeUpdate?: (currentTime: number) => void;
  onEvent?: (event: string, details?: any) => void;
}

const ShakaPlayer: React.FC<ShakaPlayerProps> = ({ src, onTimeUpdate, onEvent }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<shaka.Player | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const player = new shaka.Player(video);
      playerRef.current = player;

      player.load(src).catch((error: shaka.util.Error) => {
        console.error('Shaka Player Error:', error);
      });

      if (onTimeUpdate) {
        video.addEventListener('timeupdate', () => {
          onTimeUpdate(video.currentTime);
        });
      }

      if (onEvent) {
        player.addEventListener('error', (e: shaka.util.Error) => onEvent('error', e));
      }
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [src, onTimeUpdate, onEvent]);

  return <video ref={videoRef} style={{ width: '100%', height: '100%' }} controls autoPlay />;
};

export default ShakaPlayer;
