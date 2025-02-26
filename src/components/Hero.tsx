import React from 'react'
import './Hero.scss'

import Card from './Card'

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="hero">
      <Card />
    </div>
  )
}

export default Hero
