const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { log } = require('console')
const CharacterRoute = require('./routes/character')
const userRoute = require('./routes/user')
const orderRoute = require('./routes/order')
const path = require('path');

require('dotenv/config')

const app = express();

//used with React
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(CharacterRoute)
app.use(userRoute)
app.use(orderRoute)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'DV200Term3' //COLLECTION NAME ON MONGODB
}).then(() => {
    console.log("Connected to the database")
})
    .catch((err) => {
        console.log("No Conncection. Error:" + err)
    })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log('Server started on port', PORT) })