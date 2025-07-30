import React from 'react';
import './Header.css';
const Header: React.FC = () => {
    return (
        <header className="header">
            {/* <nav>
                <img src={rickylogo} alt="Rick and Morty Logo" className="header-logo" />
            </nav> */}
            <h1 className="header-title">Rick & Morty Explorer</h1>
        </header>
    );
};

export default Header;