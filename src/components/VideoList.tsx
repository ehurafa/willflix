import React from 'react'
import './VideoList.scss'
import { Link } from 'react-router-dom'

interface CardData {
  id: number
  title: string
  thumbnail: string
  link: string
}

interface CardListProps {
  cards: CardData[]
}

const VideoList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="video-list">
      {cards && cards.map((card) => (
          <Link key={card.id} to={card.link} className="mini-card">
            <div
              className="card-thumbnail"
              style={{ backgroundImage: `url(${card.thumbnail})` }}
            ></div>
            <h3 className="card-title">{card.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default VideoList;
