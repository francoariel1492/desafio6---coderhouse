const mongoose = require('mongoose');

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
    products: Array
});

const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = Cart;