import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause, FaExpand, FaForward, FaBackward, FaSun, FaStepForward } from "react-icons/fa";
import "./VideoPlayerHSLReactPlayer.scss";

const VideoPlayerHSLReactPlayer = ({ src, nextEpisode, initialTime = 0, onSaveProgress }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [brightness, setBrightness] = useState(100);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(initialTime);
    }
  }, [initialTime]);

  const togglePlay = () => setPlaying(!playing);

  const handleProgress = ({ playedSeconds }) => {
    setProgress(playedSeconds);
    if (onSaveProgress) {
      onSaveProgress(playedSeconds);
    }
  };

  const handleDuration = (dur) => setDuration(dur);

  const rewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(Math.max(progress - 10, 0));
    }
  };

  const forward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(Math.min(progress + 10, duration));
    }
  };

  const handleNextEpisode = () => {
    if (nextEpisode) {
      nextEpisode();
    }
  };

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  const handleSeek = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    playerRef.current.seekTo(newTime);
    setProgress(newTime);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timeout);
  }, [showControls]);

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

        <div className="progress-bar" onClick={handleSeek}>
          <div className="progress" style={{ width: `${(progress / duration) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerHSLReactPlayer;
