const mongoose = require("mongoose");

const usernameSchima = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    proImg: {
        type: String,
        default: ""
    }


},
    { timestamps: true }
)
module.exports= mongoose.model("User",  usernameSchima);