import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderP() {
    const [apiOrders, setApiOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/orders/')
            .then((response) => {
                console.log(response.data);
                if (response.data.length > 0) {
                    setApiOrders(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleRemoveOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5000/api/order/${orderId}`);
            setApiOrders(apiOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container_p">
            <div className="card_o">
                <div className="title_i">Order Management</div>
                {apiOrders.map((order, index) => (
                    <div className="content_i" key={index}>
                        <div className='orders_user_info'>
                            <div>
                                <h1>{order.name} {order.surname}</h1>
                                <h1>{order.address}</h1>
                            </div>
                            <div>
                                <h1>{order.cart_character_names}</h1>
                                <h1>{order.cart_character_element}</h1>
                            </div>
                            <div>
                                <h1>{order.cart_character_amount}</h1>
                            </div>
                            <button className="dispatch_button" onClick={() => handleRemoveOrder(order._id)}>Dispatch</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderP;
