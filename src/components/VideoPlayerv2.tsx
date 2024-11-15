import React, { useRef, useState, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdOutlineFullscreen, MdCloseFullscreen } from 'react-icons/md'
import styles from './VideoPlayerv2.module.scss'

interface VideoPlayerProps {
  src: string
  poster?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null) // Referência para o container do player
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(1)
  const [progress, setProgress] = useState<number>(0)
  const [buffering, setBuffering] = useState<boolean>(false)
  const [controlsVisible, setControlsVisible] = useState<boolean>(false)

  const togglePlayPause = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleFullScreen = () => {
    if (!playerRef.current) return
    if (!isFullScreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen()
      } else if ((playerRef.current as any).mozRequestFullScreen) {
        (playerRef.current as any).mozRequestFullScreen()
      } else if ((playerRef.current as any).webkitRequestFullscreen) {
        (playerRef.current as any).webkitRequestFullscreen()
      } else if ((playerRef.current as any).msRequestFullscreen) {
        (playerRef.current as any).msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullScreen(!isFullScreen)
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    if (videoRef.current) videoRef.current.volume = newVolume
    setVolume(newVolume)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const currentTime = videoRef.current.currentTime
    const duration = videoRef.current.duration
    setProgress((currentTime / duration) * 100)
  }

  const handleBuffering = () => setBuffering(true)
  const handleBufferEnd = () => setBuffering(false)

  const handleTouch = () => {
    setControlsVisible(true)
    setTimeout(() => setControlsVisible(false), 3000) // Esconde os controles após 3 segundos
  }

  const handleMouseEnter = () => {
    setControlsVisible(true) // Mostra os controles quando o mouse entra
  }

  const handleMouseLeave = () => {
    setControlsVisible(false) // Esconde os controles quando o mouse sai
  }

  const jumpTime = (seconds: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime += seconds
  }

  // Autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [])

  return (
    <div
      className={styles['video-player']}
      ref={playerRef}
      onTouchStart={handleTouch} // Mostra os controles ao tocar
      onMouseEnter={handleMouseEnter} // Mostra os controles ao passar o mouse
      onMouseLeave={handleMouseLeave} // Esconde os controles ao sair com o mouse
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={handleBuffering}
        onPlaying={handleBufferEnd}
        onEnded={() => setIsPlaying(false)}
        controls={false}
        autoPlay
      />

      <div className={`${styles.controls} ${controlsVisible ? styles.visible : ''}`}>
        <button className={`${styles.button} ${styles['play-pause']}`} onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className={styles['progress-bar-container']}>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className={styles['progress-bar']}
            onChange={(e) => {
              if (!videoRef.current) return
              const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration
              videoRef.current.currentTime = newTime
              setProgress(parseFloat(e.target.value))
            }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className={styles['volume-control']}
        />

        <button className={styles.button} onClick={() => jumpTime(-10)}>
          -10s
        </button>

        <button className={styles.button} onClick={() => jumpTime(10)}>
          +10s
        </button>

        <button className={styles.button} onClick={toggleFullScreen}>
          {isFullScreen ? <MdCloseFullscreen /> : <MdOutlineFullscreen />}
        </button>

        {buffering && <div className={styles['loading-indicator']}>Loading...</div>}
      </div>
    </div>
  )
}

export default VideoPlayer
