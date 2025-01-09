import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'

const Header: React.FC = () => {

  return (
    <div className="header">
      <nav>
        <ul>
          <li><Link to="/" className="button pill">Inicio</Link></li>
          {/* <li><Link to="/videos" className="button pill">Videos</Link></li> */}
        </ul>
        <p>
          Dinheiro acumulado: RS100,00
        </p>
      </nav>
    </div>
  );
};

export default Header;
