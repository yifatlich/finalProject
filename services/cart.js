const Cart = require('../models/cart');
const User = require('../models/customer');

const CartService = {
    async addToCart(username, productId, productName, price, quantity = 1) {

        try {
            let cart = await Cart.findOne({ username });

            if (!cart) {
                cart = new Cart({
                    username: username,
                    items: [{ productId, productName,price, quantity }],
                });
            } else {
                const existingItem = cart.items.find(item => item.productId.toString() === productId.toString());
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.items.push({ productId,productName, price, quantity });
                }
            }

            cart.updatedAt = Date.now();
            const updatedCart = await cart.save();
            return updatedCart; 

            console.log('Cart updated successfully');
        } catch (error) {
            console.error('Error adding to cart:', error.message);
        }
    },

    async getCartByUsername(username) {
            return await Cart.findOne({ username }).populate('items.productId').exec();
    },
    
    async removeItemFromCart(productId) {
        const username = req.session.username;
        const cart = await Cart.findOne({ username });
        if (!cart) throw new Error("Cart not found");

        cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());
        cart.updatedAt = new Date();
        await cart.save();

        return cart;
    },

   
    async clearCart(username) {
        const cart = await Cart.findOne({ username });
        if (!cart) throw new Error("Cart not found");

        cart.items = [];
        cart.updatedAt = new Date();
        await cart.save();

        return cart;
    },

    
    async calculateTotalPrice(username) {
        const cart = await Cart.findOne({ username });
        if (!cart) throw new Error("Cart not found");

        const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total;
    }
};




module.exports = CartService;