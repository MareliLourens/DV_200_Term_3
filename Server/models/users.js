const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },

});

module.exports = mongoose.model("Users", UserSchema)