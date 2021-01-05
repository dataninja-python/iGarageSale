/*
* dependencies
* */
var mongoose = require("mongoose");
/*
* schema
* */
var electronicsSchema = new mongoose.Schema({
    name: String,
    brand: String,
    color: String,
    quantity: { type: Number, min: 0 },
    price: Number,
    image: String
});
/*
* model
* */
var Electronics = mongoose.model("Electronics", electronicsSchema);
/*
* export
* */
module.exports = Electronics;
