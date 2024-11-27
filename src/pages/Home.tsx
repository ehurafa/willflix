import React from 'react';
import './Home.css';
import backgroundImage from '../assets/background.jpg';

const Home: React.FC = () => (
  <div className="home">
    <img src={backgroundImage} alt="Background" className="background-image" />
  </div>
);

export default Home;
