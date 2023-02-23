const { Router } = require('express');
const { MongoProductManager } = require('../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();
const router = Router();

//Obtener todos los productos y con limit
//http://localhost:3000/api/products
//http://localhost:3000/api/products?limit=5
router.get('/', async (req, res) => {
    try {
        const products = await productsMongo.getProducts();
        let data;
        ///res.status(200).json({ products })
        if (req.query.limit) {
            data = Object.values(products).slice(0, req.query.limit);
            res.render('home.handlebars', { data });
        } else {
            data = products;
            res.render('home.handlebars', { data });
        }
        

    } catch (error) {
        //console.log(error);
        res.status(500).json({ mesagge: { error } });
    }

});

//Obtener producto por id
//http://localhost:3000/api/products/5
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsMongo.getProductById(productId);
    res.status(200).json({ mesagge: getById });
});


//Añadir producto
//http://localhost:3000/api/products
//body raw en postman para .post
// {
//     "title": "Titulo prueba", 
//     "description": "Descripcion prueba", 
//     "price": 999, 
//     "thumbnail": ["url prueba"], 
//     "code": "A-prueba-Z", 
//     "stock": 999,
//     "status": true,
//     "category": "Categoria prueba"
// }
router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }

        const verifyExistenceUndefined = Object.values(newProduct).indexOf(undefined);

        if (verifyExistenceUndefined === -1) {
            const createdProduct = await productsMongo.addProduct(newProduct);
            const products = await productsMongo.getProducts();
            global.io.emit('statusProductsList', products);
            res.json({ mesagge: createdProduct });
        }
        else {
            res.status(406).json({ mesagge: "Product with missing information" });
        }

    } catch (error) {
        res.status(500).json({ mesagge: { error } });
    }

});

//Actualizar producto
//http://localhost:3000/api/products/11
//body raw en postman para .put
// {
//     "title": "Titulo actualizado", 
//     "description": "Descripcion actualizado", 
//     "price": 111, 
//     "thumbnail": ["url actualizado"], 
//     "code": "A-actualizado-Z", 
//     "stock": 111,
//     "status": true,
//     "category": "Categoria actualizado"
// }
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    const newUpdatedProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    }

 
        const verifyExistenceUndefined = Object.values(newUpdatedProduct).indexOf(undefined);

        if (verifyExistenceUndefined === -1) {
            const UpdatedProduct = await productsMongo.updateProduct(productId, newUpdatedProduct);
            const products = await productsMongo.getProducts();
            global.io.emit('statusProductsList', products);
            res.json({ mesagge: UpdatedProduct });
        }
        else {
            res.status(406).json({ mesagge: "Product with missing information" });
        }

    
});

//Eliminar producto por id
//http://localhost:3000/api/products/5
//http://localhost:3000/api/products/111
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsMongo.deleteById(productId);
    const products = await productsMongo.getProducts();
    global.io.emit('statusProductsList', products);
    res.status(200).json({ mesagge: getById });
});


//Eliminar todos los productos
//http://localhost:3000/api/products
router.delete('/', async (req,res) =>{
    await productsMongo.deleteAll()
    res.status(200).json({message: "Products deleted"})
})

module.exports = router;