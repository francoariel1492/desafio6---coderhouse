const Cart = require("../../models/carts.model");

class MongoCartManager {

    async getCarts() {
        try {
            const carts = await Cart.find();
            return carts;
        }
        catch (error) {
            return error;
        }
    }

    async addCart(cart) {
        try {
            const addMongoCart = await Cart.create(cart);
            return "Cart added successfully";
        }
        catch (error) {
            return error;
        }
    }

    async getCartById(id){
        try {
            const getCartByIdMongo = await Cart.findById(id);
            return getCartByIdMongo;
            
        } 
        catch (error) {
            return error;
        }
    }

    async updateCartProductsId(id,arrayProducts) {
        try {
            const getProductByIdMongo = await Cart.findByIdAndUpdate(id,{products: arrayProducts});
            return "cart products updated" 
        }
        catch (error) {
            return error;
        }
    }

    // async deleteById(id){
    //     try {
    //         const jsonData = await this.getCarts();
    //         const cart = Object.values(jsonData).find((e) => e.id === id);
    //         if (cart) {
    //             let newJsonData = jsonData.filter((item) => item.id !== id);
    //             await fs.promises.writeFile(this.cart, JSON.stringify(newJsonData));
    //             return "Removed cart successfully";
    //         } 
    //         else {
    //             return "Not Found";
    //         }
    //     } 
    //     catch (error) {
    //         return error;
    //     }
    // }

    // async updateCart(id,cart){
    //     try {
    //         const jsonData = await this.getCarts();
    //         const itemId = Object.values(jsonData ).find((e) => e.id === id);
    //         const propertyCondition = cart.hasOwnProperty("title") && cart.hasOwnProperty("description")&& cart.hasOwnProperty("price")&& cart.hasOwnProperty("thumbnail")&& cart.hasOwnProperty("code")&& cart.hasOwnProperty("stock")&& cart.hasOwnProperty("status")&& cart.hasOwnProperty("category");

    //         if (itemId === undefined) {
    //             return "Not Found";
    //         } 
    //         else {
    //             if (propertyCondition) {
    //                 itemId.title = cart.title;
    //                 itemId.description = cart.description;
    //                 itemId.price = cart.price;
    //                 itemId.thumbnail = cart.thumbnail;
    //                 itemId.code = cart.code;
    //                 itemId.stock = cart.stock;
    //                 itemId.status = cart.sattus;
    //                 itemId.category = cart.category;

    //                 await fs.promises.writeFile(this.cart, JSON.stringify(jsonData)); 
    //                 return "updated cart successfully";
    //             } 
    //             else {
    //                 return "Cart with missing information";
    //             }  
    //         }   
    //     } 
    //     catch (error) {
    //         return error;
    //     }
    // }
}

module.exports = { MongoCartManager };
