import React, { useRef, useState, useEffect } from "react"
import ReactPlayer from "react-player"
import { FaPlay, FaPause, FaExpand, FaForward, FaBackward, FaSun, FaStepForward } from "react-icons/fa"
import "./VideoPlayerHSLReactPlayer.scss"

interface VideoPlayerProps {
  src: string;
  nextEpisode?: () => void;
  initialTime?: number;
  onSaveProgress?: (time: number) => void
}

const VideoPlayerHSLReactPlayer: React.FC<VideoPlayerProps> = ({ src, nextEpisode, initialTime = 0, onSaveProgress }) => {
  const playerRef = useRef<ReactPlayer | null>(null)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(initialTime)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [brightness, setBrightness] = useState(100)

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(initialTime, "seconds")
    }
  }, [initialTime])

  const togglePlay = () => setPlaying((prev) => !prev)

  const handleProgress = (state: { playedSeconds: number }) => {
    setProgress(state.playedSeconds)
    onSaveProgress?.(state.playedSeconds)
  }

  const handleDuration = (dur: number) => setDuration(dur)

  const rewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(Math.max(progress - 10, 0), "seconds")
    }
  }

  const forward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(Math.min(progress + 10, duration), "seconds")
    }
  }

  const handleNextEpisode = () => {
    nextEpisode?.()
  }

  const handleBrightnessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(event.target.value))
  }

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!duration || !playerRef.current) return
    const newTime = (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * duration
    playerRef.current.seekTo(newTime, "seconds")
    setProgress(newTime)
  }

  useEffect(() => {
    const timeout = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timeout)
  }, [showControls])

  return (
    <div
      className="netflix-player"
      style={{ filter: `brightness(${brightness}%)` }}
      onMouseMove={() => setShowControls(true)}
      onTouchStart={() => setShowControls(true)}
    >
      <ReactPlayer
        ref={playerRef}
        url={src}
        playing={playing}
        playbackRate={playbackRate}
        controls={false}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100%"
        height="100%"
      />

      {/* Controles */}
      <div className={`controls ${showControls ? "" : "hidden"}`}>
        {!playing && (
          <button onClick={togglePlay} className="play-center">
            {playing ? <FaPause /> : <FaPlay />}
          </button>
        )}

        <div className="bottom-controls">
          <div>
            <button onClick={rewind} className="control-button">
              <FaBackward />
            </button>

            <button onClick={togglePlay} className="control-button">
              {playing ? <FaPause /> : <FaPlay />}
            </button>

            <button onClick={forward} className="control-button">
              <FaForward />
            </button>

            <select className="speed-selector" value={playbackRate} onChange={(e) => setPlaybackRate(Number(e.target.value))}>
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>

            <button onClick={handleNextEpisode} className="control-button">
              <FaStepForward />
            </button>
          </div>

          <div>
            <div className="brightness-control">
              <FaSun />
              <input type="range" min="50" max="150" value={brightness} onChange={handleBrightnessChange} />
            </div>

            <span className="time-display">
              {new Date(progress * 1000).toISOString().substring(14, 19)} / {new Date(duration * 1000).toISOString().substring(14, 19)}
            </span>

            <button onClick={() => document.documentElement.requestFullscreen()} className="control-button">
              <FaExpand />
            </button>
          </div>
        </div>

        <div className="progress-bar" onClick={handleSeek}>
          <div className="progress" style={{ width: `${(progress / duration) * 100}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayerHSLReactPlayer
