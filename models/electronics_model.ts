/*
* dependencies
* */
const mongoose = require("mongoose");

/*
* schema
* */
const electronicsSchema = new mongoose.Schema({
    name: String,
    brand: String,
    color: String,
    quantity: {type: Number, min: 0},
    price: Number,
    image: String
});

/*
* model
* */
const Electronics = mongoose.model("Electronics", electronicsSchema);

/*
* export
* */
module.exports = Electronics;
