const mongoose = require('mongoose');

const productsCollection = 'product';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: Array,
    code: String,
    stock: Number,
    status: Boolean,
    category: String,
    idd: Number

});

const Product = mongoose.model(productsCollection, productSchema);

module.exports = Product