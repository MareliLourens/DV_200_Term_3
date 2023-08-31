import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/logo.svg';
import Search from '../assets/search.svg';
import './navbar.css';
import DownArrow from "../assets/down_arrow.svg"
import Devider from "../assets/devider.svg"

function BasicNav() {
    const [dropdownVisible, setDropdownVisible] = useState({ profile: false, rarity: false });

    const toggleDropdown = (dropdownName) => {
        setDropdownVisible((prevState) => ({
            ...prevState,
            [dropdownName]: !prevState[dropdownName],
        }));
    };

    return (
        <div className="App">
            <nav className="navbar">
                <Link to="/" className="nav-link">
                    <img className="nav_image" src={Logo} alt="Logo" />
                </Link>
                <Link to="/" className="nav-link">
                    <h3 className="nav_text">Featured</h3>
                </Link>
                <Link to="/" className="nav-link">
                    <h3 className="nav_text">New arrivals</h3>
                </Link>
                <Link to="/products" className="nav-link">
                    <h3 className="nav_text">Products</h3>
                </Link>
                <a className="nav-link">
                    <img className="nav_search" src={Search} alt="Search" />
                    <button className="profile_button" onClick={() => toggleDropdown('profile')}>
                        <img className='profile_arrow' src={DownArrow} alt="Arrow" />
                        <h3 className="nav_profile">Profile</h3>
                    </button>
                    {dropdownVisible.profile && (
                        <div className="dropdown_content_profile">
                            <Link to="/cart" className="nav-link">
                                <div className="dropdown_text">Cart</div>
                            </Link>
                            <img className="dropdown_text" src={Devider} alt="Divider" />
                            <Link to="/" className="nav-link">
                                <div className="dropdown_text">Sign Out</div>
                            </Link>
                        </div>
                    )}
                </a>
            </nav>
        </div>
    );
}

export default BasicNav;
