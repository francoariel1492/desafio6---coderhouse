const { Router } = require('express');

const router = Router();

const { MongoCartManager } = require('../dao/mongoClassManagers/cartsClass/cartMongoManager');
const cartsMongo = new MongoCartManager();

const { MongoProductManager } = require('../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();



//http://localhost:3000/api/carts
//Obtener todos los carts
router.get('/', async (req, res) => {
    const carts = await cartsMongo.getCarts();

    res.json(carts);

});

//http://localhost:3000/api/carts
//Crear cart
router.post('/', async (req, res) => {
    try {
        const createdCart = await cartsMongo.addCart({});
        res.json({ mesagge: createdCart });
    }
    catch (error) {
        res.status(500).json({ mesagge: "Server error" });
    }


});


//http://localhost:3000/api/carts/1
//Obtener cart por id
router.get('/:id', async (req, res) => {
    const cartId = req.params.id;
    const getById = await cartsMongo.getCartById(cartId);

    const mesagge = {
        Carrito: cartId,
        Elementos: getById.products
    }
    res.status(200).json({ mesagge: mesagge });


});

//http://localhost:3000/api/carts/1/products/1
//Añadir producto a cart
router.post('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const getCartById = await cartsMongo.getCartById(cartId);
    const getProductById = await productsMongo.getProductById(productId);
    const productoTitulo = getProductById.title;

    const verifyExistence = getCartById.products.find((e) => e.product === productoTitulo);

    if (verifyExistence === undefined) {
        const newProduct = {
            product: productoTitulo,
            quantity: 1
        };
        getCartById.products.push(newProduct);
        let newCart = getCartById.products;
        
        console.log(newCart);
        const updateCartProducts = await cartsMongo.updateCartProductsId(cartId, newCart)
        res.status(200).json({ mesagge: 'New product added' });
    }
    else {
        let newArray = getCartById.products;
        const productsArrayPosition = getCartById.products.findIndex(item => item.product === productoTitulo);
        newArray[productsArrayPosition].quantity = newArray[productsArrayPosition].quantity = newArray[productsArrayPosition].quantity = newArray[productsArrayPosition].quantity + 1;
        console.log(newArray);
        const updateCartProducts = await cartsMongo.updateCartProductsId(cartId, newArray);
        res.status(200).json({ mesagge: 'Product quantity updated' });

    }
});

//http://localhost:3000/api/carts/
//Eliminar todos los carts

router.delete('/', async (req,res) =>{
    await cartsMongo.deleteAll()
    res.status(200).json({message: "Carts deleted"})
})

module.exports = router;