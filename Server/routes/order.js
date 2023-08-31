const express = require('express');
const OrderSchema = require('../models/orders');

const router = express.Router();

// GET
router.get('/api/orders/', async (req, res) => {
    try {
        const foundOrders = await OrderSchema.find();
        res.json(foundOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
});

//READ SINGLE
router.get('/api/order/:id', async (req, res) => {
    const FindOrder = await OrderSchema.findById(req.params.id);
    res.json(FindOrder)
})

// POST
router.post('/api/orders', async (req, res) => {
    const { name, surname, card_number, address, cart_character_names, cart_character_amount, cart_character_element } = req.body;

    try {
        const newOrder = new OrderSchema({
            name,
            surname,
            card_number,
            address,
            cart_character_names,
            cart_character_amount,
            cart_character_element
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Unable to create order' });
    }
});

//DELETE
router.delete('/api/order/:id', async (req, res) => {
    const { id } = req.params;
    await OrderSchema.findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

module.exports = router;
