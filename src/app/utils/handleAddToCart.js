const handleAddToCart = (foodId) => {
    // Retrieve existing cart items from local storage
    let productsInCart = JSON.parse(localStorage.getItem('favFoodCart')) || [];

    // Check if the product already exists in the cart
    const existingItemIndex = productsInCart.findIndex(item => item.productId === foodId);

    if (existingItemIndex !== -1) {
        // If the product exists, increment its quantity by 1
        productsInCart[existingItemIndex].quantity += 1;
    } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        productsInCart.push({ productId: foodId, quantity: 1 });
    }
    // Save the updated cart back to local storage
    localStorage.setItem('favFoodCart', JSON.stringify(productsInCart));
};