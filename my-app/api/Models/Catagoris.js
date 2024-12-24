const mongoose = require("mongoose");

const catSchima = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }

},
    { timestamps: true }
)
module.exports= mongoose.model("Categories",  catSchima);