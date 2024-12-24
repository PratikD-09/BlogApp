const mongoose = require("mongoose");

const postSchima = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    Photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    categeris: {
        type: Array,
        requried : false
    }


},
    { timestamps: true }
)
module.exports= mongoose.model("Post",  postSchima);