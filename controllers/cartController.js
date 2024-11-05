const cart = []; 

exports.addToCart = (req, res) => {
    const { id, name, price, quantity } = req.body;

    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
    }

    res.json({ success: true, cart });
};

exports.getCart = (req, res) => {
    res.json({ success: true, cart });
};
