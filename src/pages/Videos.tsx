import React from 'react';
import { Link } from 'react-router-dom';

const Videos: React.FC = () => {
  const videos = [
    { id: 1, title: 'Video 1', thumbnail: '/thumb1.jpg', videoUrl: '/videos/video1.mp4' },
    { id: 2, title: 'Video 2', thumbnail: '/thumb2.jpg', videoUrl: '/videos/video2.mp4' },
  ];

  return (
    <div>
      {videos.map((video) => (
        <Link to={`/videos/${video.id}`} key={video.id}>
          <img src={video.thumbnail} alt={video.title} />
          <p>{video.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Videos;
