import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import React from "react";
import DownArrow from "../assets/down_arrow.svg"
import Devider from "../assets/devider.svg"



function Products() {
    const [apiCharacters, setApiCharacters] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState({ region: false, rarity: false });
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedRarity, setSelectedRarity] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/characters/')
            .then((response) => {
                if (response.data.length > 0) {
                    let filteredCharacters = response.data;

                    if (selectedRegion) {
                        filteredCharacters = filteredCharacters.filter(character => character.region === selectedRegion);
                    }

                    if (selectedRarity) {
                        filteredCharacters = filteredCharacters.filter(character => character.rarity === selectedRarity);
                    }

                    setApiCharacters(filteredCharacters);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedRegion, selectedRarity]);

    const toggleDropdown = (dropdownName) => {
        setDropdownVisible((prevState) => ({
            ...prevState,
            [dropdownName]: !prevState[dropdownName],
        }));
    };

    const handleRegionClick = (region) => {
        setSelectedRegion(region);
        setDropdownVisible({ ...dropdownVisible, region: false });
    };

    const handleRarityClick = (rarity) => {
        setSelectedRarity(rarity);
        setDropdownVisible({ ...dropdownVisible, rarity: false });
    };



    return (

        <div className="container_p">
            <div className="card_p">
                <div className="title">Products</div>
                <button className='product_button' onClick={() => toggleDropdown('region')}>
                    Region
                    <img className='product_arrow' src={DownArrow}></img>
                </button>
                {dropdownVisible.region && (
                    <div className="dropdown_content_region">
                        <div className="dropdown_text_p" onClick={() => handleRegionClick(null)}>All</div>
                        <img className="dropdown_text_p" src={Devider} alt="Divider" />
                        <div className="dropdown_text_p" onClick={() => handleRegionClick("Mondstadt")}>Mondstadt</div>
                        <img className="dropdown_text_p" src={Devider} alt="Divider" />
                        <div className="dropdown_text_p" onClick={() => handleRegionClick("Liyue")}>Liyue</div>
                        <img className="dropdown_text_p" src={Devider} alt="Divider" />
                        <div className="dropdown_text_p" onClick={() => handleRegionClick("Inazuma")}>Inazuma</div>
                        <img className="dropdown_text_p" src={Devider} alt="Divider" />
                        <div className="dropdown_text_p" onClick={() => handleRegionClick("Sumeru")}>Sumeru</div>
                    </div>
                )}
                <button className='product_button' onClick={() => toggleDropdown('rarity')}>
                    Rarity
                    <img className='product_arrow' src={DownArrow} alt="Down Arrow" />
                </button>
                {dropdownVisible.rarity && (
                    <div className="dropdown_content_rarity">
                        <div className="dropdown_text_p" onClick={() => handleRarityClick(null)}>All</div>
                        <img className="dropdown_text_p" src={Devider} alt="Divider" />
                        <div className="dropdown_text_p" onClick={() => handleRarityClick(4)}>4 star</div>
                        <img className="dropdown_text_p" src={Devider} alt="Divider" />
                        <div className="dropdown_text_p" onClick={() => handleRarityClick(5)}>5 star</div>
                    </div>
                )}
                <div className="container_card_p">
                    {apiCharacters.map((character, index) => (
                        <div className="holder_p" key={index}>
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
    )
}

export default Products;