import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import React from "react";

import Text_Logo from '../assets/hero_text_h1.svg'
import Genshin_Impact_Icon from '../assets/genshin_impact_icon.png'


function Landing() {

    const [apiCharacters, setApiCharacters] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [discounted, setDiscounted] = useState([]);

    useEffect(() => {
        // First API call to fetch all characters
        axios.get('http://localhost:5000/api/characters/')
            .then((response) => {
                console.log(response);
                if (response.data.length > 0) {
                    setApiCharacters(response.data);

                    // Filter and set only the last 4 five-star characters as featured
                    setFeatured(response.data.slice(0, 4));

                    // Filter and set the last 4 five-star characters as new arrivals
                    const newarivals = response.data.filter(character => character.rarity === 5);
                    setNewArrivals(newarivals.slice(-4));

                    const discounted = response.data.filter(character => character.rarity === 4);
                    discounted.sort((a, b) => a.price - b.price);

                    // Set the 4 cheapest characters in the discounted section
                    setDiscounted(discounted.slice(0, 4));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }



    return (
        <div>
            <div className="hero_section">
                <h1 className="hero_text">Welcome to</h1>
                <img className="hero_text_logo" src={Text_Logo} />
                <button className='hero_button1' onClick={() => scrollToSection('NewArrivalsSection')}>New Arrivals</button>
                <button className='hero_button2' onClick={() => scrollToSection('FeaturedSection')}>Featured</button>

                <h1 className='explore1'>Explore our shop through the</h1>
                <img className="explore2" src={Genshin_Impact_Icon} />
                <h1 className='explore3'>section</h1>
            </div>

            <div className='Featured' id='FeaturedSection'>
                <div className="container">
                    <div className="card">
                        <div className="title">Featured</div>
                        <div className="container_card">
                            {featured.map((character, index) => (
                                <div className="holder" key={index}>
                                    <Link to={`/character/${character._id}`} className="character-link">
                                        <img className="image" src={`http://localhost:5000/${character.character_model_img}`} alt={character.name} />
                                        <div className="overlay">
                                            <div className="content">
                                                <div className="btn-view-more">View more</div>
                                                <div className="character-title">{character.title}</div>
                                                <div className="character-name">{character.name}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='NewArrivals' id='NewArrivalsSection'>
                <div className="container">
                    <div className="card">
                        <div className="title">New Arrivals</div>
                        <div className="container_card">
                            {newArrivals.map((character, index) => (
                                <div className="holder" key={index}>
                                    <Link to={`/character/${character._id}`} className="character-link">
                                        <img className="image" src={`http://localhost:5000/${character.character_model_img}`} alt={character.name} />
                                        <div className="overlay">
                                            <div className="content">
                                                <div className="btn-view-more">View more</div>
                                                <div className="character-title">{character.title}</div>
                                                <div className="character-name">{character.name}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="card">
                    <div className="title">Discounted</div>
                    <div className="container_card">
                        {discounted.map((character, index) => (
                            <div className="holder" key={index}>
                                <Link to={`/character/${character._id}`} className="character-link">
                                    <img className="image" src={`http://localhost:5000/${character.character_model_img}`} alt={character.name} />
                                    <div className="overlay">
                                        <div className="content">
                                            <div className="btn-view-more">View More</div>
                                            <div className="character-title">{character.title}</div>
                                            <div className="character-name">{character.name}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    )

}

export default Landing;