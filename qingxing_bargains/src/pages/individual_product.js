import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DownArrow from "../assets/down_arrow.svg";
import Devider from "../assets/devider.svg";
import { useCart } from '../components/CartContext';
import Anemo from "../assets/character_images/Elements/Element_Anemo.svg";
import Cryo from "../assets/character_images/Elements/Element_Cryo.svg";
import Dendro from "../assets/character_images/Elements/Element_Dendro.svg";
import Electro from "../assets/character_images/Elements/Element_Electro.svg";
import Geo from "../assets/character_images/Elements/Element_Geo.svg";
import Hydro from "../assets/character_images/Elements/Element_Hydro.svg";
import Pyro from "../assets/character_images/Elements/Element_Pyro.svg";

function IndividualProduct() {
    const { _id } = useParams();
    console.log(_id);

    const [characterDetails, setCharacterDetails] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState({ element: false, rarity: false });
    const [selectedElement, setSelectedElement] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/character/${_id}`)
            .then((response) => {
                console.log(response.data);
                setCharacterDetails([response.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [_id]);

    const toggleDropdown = (dropdownName) => {
        setDropdownVisible((prevState) => ({
            ...prevState,
            [dropdownName]: !prevState[dropdownName],
        }));
    };

    const handleElementClick = (element) => {
        setSelectedElement(element);
        setDropdownVisible({ ...dropdownVisible, element: false });
    };

    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        const elementToAdd = selectedElement || characterDetails[0]?.default_element;

        if (elementToAdd) {
            addToCart({
                _id,
                element: elementToAdd,
                quantity: quantity, // Add the selected quantity to the cart
            });
            console.log(`Added to cart: Character ID: ${_id}, Element: ${elementToAdd}, Quantity: ${quantity}`);
        }
    }
        ;

    const elementImages = {
        Anemo,
        Cryo,
        Dendro,
        Electro,
        Geo,
        Hydro,
        Pyro,
    };

    const defaultElementImages = {
        Anemo: Anemo,
        Cryo: Cryo,
        Dendro: Dendro,
        Electro: Electro,
        Geo: Geo,
        Hydro: Hydro,
        Pyro: Pyro,
    };

    return (
        <div className="container_p">
            <div className="card_i">
                <div className="title_i">More info</div>
                <div className='content_i'>
                    <div>
                        {characterDetails.map((character, index) => (
                            <img className='image_card_i' src={`http://localhost:5000/${character.character_card_img}`} alt={character.name} />
                        ))}
                        {selectedElement ? (
                            <img className="element_button_img" src={elementImages[selectedElement]} alt={selectedElement} />
                        ) : (
                            <img className="element_button_img" src={defaultElementImages[characterDetails[0]?.default_element]} alt={characterDetails[0]?.default_element} />
                        )}
                    </div>
                    <div className='information_i'>
                        {characterDetails.map((character, index) => (
                            <div key={index}>
                                <div className="character_name_i">{character.name}</div>
                                <div className="character_title_i">{character.title}</div>
                                <div className="character_description_i">{character.description}</div>
                                <div className="character_price_i">R{character.price}</div>
                                <button className='element_button' onClick={() => toggleDropdown('element')}>
                                    Element
                                    <img className='product_arrow' src={DownArrow} alt="Dropdown Arrow" />
                                </button>
                                {dropdownVisible.element && (
                                    <div className="dropdown_content_element">
                                        <div
                                            className={`dropdown_text_p${selectedElement === null ? ' active' : ''}`}
                                            onClick={() => handleElementClick(null)}
                                        >
                                            {character.default_element}
                                        </div>
                                        <img className="dropdown_text_p" src={Devider} alt="Divider" />
                                        {character.element_options.map((element, index) => {
                                            if (element === character.default_element) {
                                                return null;
                                            }
                                            return (
                                                <React.Fragment key={index}>
                                                    <div
                                                        className={`dropdown_text_p${selectedElement === element ? ' active' : ''}`}
                                                        onClick={() => handleElementClick(element)}
                                                    >
                                                        {element}
                                                    </div>
                                                    <img className="dropdown_text_p" src={Devider} alt="Divider" />
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                )}
                                <button className='add_to_cart_button' onClick={handleAddToCart}>
                                    Add to cart
                                </button>
                                <input
                                    type="number"
                                    className="quantity-input"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                <button className="quantity_button_plus" onClick={handleIncrease}>+</button>
                                <button className="quantity_button_minus" onClick={handleDecrease}>-</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bottom_i'>
                    {characterDetails.map((character, index) => (
                        <div key={index}>
                            <img className='image_dish_i' src={`http://localhost:5000/${character.character_dish_img}`} alt={character.name} />
                            <div className="title_dish_i">Speciality Dish</div>
                            <div className="name_dish_i">{character.specialty_dish}</div>
                        </div>
                    ))}
                </div>
                <div className='bottom_i'>
                    {characterDetails.map((character, index) => (
                        <div key={index}>
                            <img className='image_dish_i' src={`http://localhost:5000/${character.character_elemental_skill_img}`} alt={character.name} />
                            <div className="title_dish_i">Elemental Skill</div>
                            <div className="name_dish_i">{character.elemental_skill}</div>
                        </div>
                    ))}
                </div>
                <div className='bottom_i'>
                    {characterDetails.map((character, index) => (
                        <div key={index}>
                            <img className='image_dish_i' src={`http://localhost:5000/${character.character_elemental_burst_img}`} alt={character.name} />
                            <div className="title_dish_i">Elemental Burst</div>
                            <div className="name_dish_i">{character.elemental_burst}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default IndividualProduct;
