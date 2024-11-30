import React from 'react'
import './Card.scss'

import { FaPlay, FaPlus  } from 'react-icons/fa'

interface CardProps {}

const Card: React.FC<CardProps> = (props) => {
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
          <div className="actions">
            <button className="button">
              <span>
                <FaPlay /> Assistir
              </span>
            </button>
            <button className="button secondary">
              <span>
                <FaPlus /> Minha lista
              </span>
            </button>
          </div>
        </header>
      </article>
    </div>
  )
}

export default Card
