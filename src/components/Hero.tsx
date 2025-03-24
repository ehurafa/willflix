import React from 'react'
import './Hero.scss'

import HeroCard from './HeroCard'

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="hero-card">
      <HeroCard />
    </div>
  )
}

export default Hero
