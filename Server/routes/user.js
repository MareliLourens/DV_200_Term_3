const express = require('express')

const UserSchema = require('../models/users')

const router = express();


//GET
router.get('/api/users/', async (req, res) => {
    const FindUser = await UserSchema.find();
    res.json(FindUser)
})

//READ SINGLE
router.get('/api/user/:id', async (req, res) => {
    const FindUser = await UserSchema.findById(req.params.id);
    res.json(FindUser)
})


//UPDATE
router.put('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    await UserSchema.updateOne({ _id: id }, req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

//CREATE
router.post('/api/user/', async (req, res) => {
    const User = new UserSchema({ ...req.body });
    await User.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})



//DELETE
router.delete('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    await UserSchema.findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

module.exports = router