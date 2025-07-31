import React from 'react';
import './Header.css';
import { Link } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
const Header: React.FC = () => {
    // const navigate=useNavigate();
  return (
    <header className="header">
      <nav className="header-nav">
        <h1 className="header-title">Rick & Morty Explorer</h1>

        <ul className="header-menu">
       
        </ul>
      </nav>
    </header>
  );
};

export default Header;
