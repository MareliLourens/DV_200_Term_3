const mongoose = require('mongoose')

const CharacterSchema = mongoose.Schema({
    name: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    default_element: {
        type: String
    },
    element_options: [String],
    rarity: {
        type: Number
    },
    region: {
        type: String
    },
    specialty_dish: {
        type: String
    },
    normal_attack: {
        type: String
    },
    elemental_skill: {
        type: String
    },
    elemental_burst: {
        type: String
    },
    character_card_img: {
        type: String
    },
    character_model_img: {
        type: String
    },
    character_icon_img: {
        type: String
    },
    character_dish_img: {
        type: String
    },
    character_normal_attack_img: {
        type: String
    },
    character_elemental_skill_img: {
        type: String
    },
    character_elemental_burst_img: {
        type: String
    },
    character_element_img: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    }
});

module.exports = mongoose.model("Characters", CharacterSchema)