const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    card_number: {
        type: Number
    },
    address: {
        type: String
    },
    cart_character_names: {
        type: String
    },
    cart_character_amount: {
        type: String
    },
    cart_character_element: {
        type: String
    }

});

module.exports = mongoose.model("Orders", OrderSchema)