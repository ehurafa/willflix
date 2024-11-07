import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={toggleMenu} aria-label="Menu">
        ☰
      </button>
      {isOpen && (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/videos">Videos</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
