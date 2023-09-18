import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><button className="navbar-button">Home(Dashboard)</button></li>
        <li className="navbar-item"><button className="navbar-button">Tickets</button></li>
        <li className="navbar-item"><button className="navbar-button">History</button></li>
        <li className="navbar-item"><button className="navbar-button">Contact</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
