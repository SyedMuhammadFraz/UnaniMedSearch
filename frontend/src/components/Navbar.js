// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/search">Search Medicine</Link></li>
                <li><Link to={`/orders`}>Order Details</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
