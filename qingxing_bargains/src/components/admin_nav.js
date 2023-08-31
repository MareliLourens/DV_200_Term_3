import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/logo.svg';
import Search from '../assets/search.svg';
import './navbar.css';

function BasicNav() {
    return (
        <div className="App">
            <nav className="navbar">
                <Link to="/" className="nav-link">
                    <img className="nav_image" src={Logo} alt="Logo" />
                </Link>
                <Link to="/admin" className="nav-link">
                    <h3 className="nav_text">Invertory Manager</h3>
                </Link>
                <Link to="/orderp" className="nav-link">
                    <h3 className="nav_text">Order Processing</h3>
                </Link>
                <Link to="/" className="nav-link">
                    <h3 className="nav_text">Sign Out</h3>
                </Link>
                <a className="nav-link">
                    <img className="nav_search" src={Search} alt="Search" />
                </a>
            </nav>
        </div>
    );
}

export default BasicNav;
