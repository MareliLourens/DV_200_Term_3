const express = require('express')
const upload = require('../multer');
const CharacterSchema = require('../models/characters')

const router = express();


//GET
router.get('/api/characters/', async (req, res) => {
    const FindCharacter = await CharacterSchema.find();
    res.json(FindCharacter)
})

//READ SINGLE
router.get('/api/character/:id', async (req, res) => {
    const FindCharacter = await CharacterSchema.findById(req.params.id);
    res.json(FindCharacter)
})


//UPDATE
router.put('/api/character/:id', async (req, res) => {
    const { id } = req.params; // Correctly destructure id here
    await CharacterSchema.updateOne({ _id: id }, req.body) // Use _id instead of id
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

//CREATE
router.post('/api/character/', async (req, res) => {
    const Character = new CharacterSchema({ ...req.body });
    await Character.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

//CREATE
router.post('/api/characterImage/', upload, async (req, res) => {
    try {
        const CharacterData = {
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            default_element: req.body.default_element,
            element_options: req.body.element_options,
            rarity: req.body.rarity,
            region: req.body.region,
            specialty_dish: req.body.specialty_dish,
            normal_attack: req.body.normal_attack,
            elemental_skill: req.body.elemental_skill,
            elemental_burst: req.body.elemental_burst,
            character_card_img: req.files['character_card_img'][0].path,
            character_model_img: req.files['character_model_img'][0].path,
            character_dish_img: req.files['character_dish_img'][0].path,
            character_normal_attack_img: req.files['character_normal_attack_img'][0].path,
            character_elemental_skill_img: req.files['character_elemental_skill_img'][0].path,
            character_elemental_burst_img: req.files['character_elemental_burst_img'][0].path,
            character_element_img: req.files['character_element_img'][0].path,
            price: req.body.price,
            stock: req.body.stock,
            character_icon_img: req.files['character_icon_img'][0].path,
        }

        const character = new CharacterSchema(CharacterData);

        await character.save()

        res.status(201).json({ message: 'Character created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

//PUT
router.put('/api/characterImage/:id', upload, async (req, res) => {
    try {
        const { id } = req.params;
        const CharacterData = {
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            default_element: req.body.default_element,
            element_options: req.body.element_options,
            rarity: req.body.rarity,
            region: req.body.region,
            specialty_dish: req.body.specialty_dish,
            normal_attack: req.body.normal_attack,
            elemental_skill: req.body.elemental_skill,
            elemental_burst: req.body.elemental_burst,
            character_card_img: req.files['character_card_img'][0].path,
            character_model_img: req.files['character_model_img'][0].path,
            character_dish_img: req.files['character_dish_img'][0].path,
            character_normal_attack_img: req.files['character_normal_attack_img'][0].path,
            character_elemental_skill_img: req.files['character_elemental_skill_img'][0].path,
            character_elemental_burst_img: req.files['character_elemental_burst_img'][0].path,
            character_element_img: req.files['character_element_img'][0].path,
            price: req.body.price,
            stock: req.body.stock,
            character_icon_img: req.files['character_icon_img'][0].path,
        }

        await CharacterSchema.findByIdAndUpdate(id, CharacterData, { new: true });

        res.status(200).json({ message: 'Character updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})


//DELETE
router.delete('/api/character/:id', async (req, res) => {
    const { id } = req.params;
    await CharacterSchema.findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

module.exports = router