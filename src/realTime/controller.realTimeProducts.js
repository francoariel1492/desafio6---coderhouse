const { Router } = require('express');
const router = Router();

// const { ProductManager } = require('../dao/fsClassManagers/productsClass/productManager');
// const productsJson = new ProductManager('./src/dao/fsClassManagers/productsClass/db/products.json');

const { MongoProductManager } = require('../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();

//Url ejemplos
//http://localhost:8080/realTimeProducts
//http://localhost:8080/realTimeProducts?limit=5
router.get('/', async (req, res) => {
    const products = await productsMongo.getProducts();
    const getAll = products;

    global.io.emit('productsList', products);
    res.render('realTimeProducts.handlebars',  {getAll} );



});



module.exports = router;