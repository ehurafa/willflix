import React from 'react'
import './HeroCard.scss'

import { FaPlay, FaPlus  } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface HeroCardProps {}

const HeroCard: React.FC<HeroCardProps> = () => {
  return (
    <div className="card">
      <article>
        <header>
          <span className="category">Desenho</span>
          <div className="title">Dragon Ball</div>
          <ul>
            <li>Anime</li>
            <li>Ação</li>
          </ul>
        </header>
        <div className="actions">
          <Link to="/videos/animes/dragonball-daima/01/ep1" className="button">
            <span>
              <FaPlay /> Assistir
            </span>
          </Link>
          <button className="button secondary">
            <span>
              <FaPlus /> Minha lista
            </span>
          </button>
        </div>
      </article>
    </div>
  )
}

export default HeroCard
