import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../components/CartContext';
import DeviderH from '../assets/devider_h.svg';

function CartPage() {
    const { cartItems, clearCartItem } = useCart();
    const [characterDetails, setCharacterDetails] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [customerSurname, setCustomerSurname] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            const characterDetailsArray = await Promise.all(
                cartItems.map(async (item) => {
                    try {
                        const response = await axios.get(`http://localhost:5000/api/character/${item._id}`);
                        return { ...response.data, cartItem: item };
                    } catch (error) {
                        console.log(error);
                        return null;
                    }
                })
            );

            setCharacterDetails(characterDetailsArray.filter(detail => detail !== null));
        };

        fetchCharacterDetails();
    }, [cartItems]);

    const handleClearCartItem = (itemId) => {
        clearCartItem(itemId);
    };

    const calculateSubtotal = () => {
        return characterDetails.reduce((total, detail) => total + detail.price * detail.cartItem.quantity, 0);
    };

    const calculateShipping = () => {
        return cartItems.length * 10; // Shipping price: 10 for each item
    };

    const handleNameInputChange = (event) => {
        setCustomerName(event.target.value);
    };

    const handleSurnameInputChange = (event) => {
        setCustomerSurname(event.target.value);
    };

    const handleCardNumberInputChange = (event) => {
        setCardNumber(event.target.value);
    };

    const handleAddressInputChange = (event) => {
        setCustomerAddress(event.target.value);
    };

    const handleCheckout = async () => {
        const cartCharacterNames = characterDetails.map(detail => detail.name).join(', ');
        const totalCartCharacterAmount = characterDetails.map(detail => detail.cartItem.quantity).join(', ');;
        const cartCharacterElement = characterDetails.map(detail => detail.cartItem.element).join(', ');

        const orderData = {
            name: customerName,
            surname: customerSurname,
            card_number: cardNumber,
            address: customerAddress,
            cart_character_names: cartCharacterNames,
            cart_character_amount: totalCartCharacterAmount,
            cart_character_element: cartCharacterElement,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/orders', orderData);
            console.log('Order placed:', response.data);
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="container_p">
            <div className="container_p">

                <div className="card_i">
                    <div className="title_i">Cart</div>
                    <div className='content_i'>
                        <div className='cart_items'>
                            <ul>
                                {characterDetails.map((detail, index) => (
                                    <div className="cart_individual_item" key={index}>
                                        <img className="cart_icon" src={`http://localhost:5000/${detail.character_icon_img}`} alt={detail.name} />
                                        <h1 className="cart_name">{detail.name}</h1>
                                        <h1 className="cart_element">{detail.cartItem.element}</h1>
                                        <h1 className="cart_price">R{detail.price * detail.cartItem.quantity}</h1>
                                        <div className="cart_amount">{detail.cartItem.quantity}</div>
                                        <button
                                            className="clear_cart_button"
                                            onClick={() => handleClearCartItem(detail.cartItem._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className='payment_info'>
                            <h1 className="cart_subtotal">Subtotal:</h1>
                            <h1 className="cart_subtotal_amount">R{calculateSubtotal()}</h1>
                            <h1 className="cart_subtotal">Shipping:</h1>
                            <h1 className="cart_subtotal_amount">R{calculateShipping()}</h1>
                            <img className="cart_devider" src={DeviderH} alt="DividerH" />
                            <h1 className="cart_subtotal">Total:</h1>
                            <h1 className="cart_subtotal_amount">R{calculateShipping() + calculateSubtotal()}</h1>
                            <h1 className="customer">Customer Details:</h1>
                            <div className='customer_input'>
                                <label className="label_name"> Name:</label>
                                <input
                                    type="text"
                                    className="input_name"
                                    value={customerName}
                                    onChange={handleNameInputChange}
                                />
                            </div>
                            <div className='customer_input'>
                                <label className="label_name"> Surname:</label>
                                <input
                                    type="text"
                                    className="input_name"
                                    value={customerSurname}
                                    onChange={handleSurnameInputChange}
                                />
                            </div>
                            <div className='customer_card_input'>
                                <label className="label_name"> Card Number:</label>
                                <input
                                    type="number"
                                    className="input_card"
                                    value={cardNumber}
                                    onChange={handleCardNumberInputChange}
                                />
                            </div>
                            <div className='customer_card_input'>
                                <label className="label_name"> Address:</label>
                                <input
                                    type="text"
                                    className="input_card"
                                    value={customerAddress}
                                    onChange={handleAddressInputChange}
                                />
                            </div>
                            <button className='purchase_button' onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CartPage;
