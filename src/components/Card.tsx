import React from 'react'
import './Card.scss'

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
            <button className="button">Assistir</button>
            <button className="button secondary">+ Minha lista</button>
          </div>
        </header>
      </article>
    </div>
  )
}

export default Card
