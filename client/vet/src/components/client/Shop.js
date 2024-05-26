import React, { useState } from 'react';
import Cart from './Cart';
import Products from './Products';

const Shop = () => {
    const [cart, setCart] = useState([]);

    const addItemToCart = (productId, quantity) => {
        fetch('/userCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token
            },
            body: JSON.stringify({ product_id: productId, quantity })
        })
        .then(response => response.json())
        .then(data => {
            setCart(prevCart => [...prevCart, data]);
        })
        .catch(error => console.error('Error adding item to cart:', error));
    };

    const updateCartItem = (productId, quantity) => {
        setCart(prevCart => prevCart.map(item => 
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const removeCartItem = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    return (
        <div>
            <Products addItemToCart={addItemToCart} />
            <Cart cartItems={cart} updateCartItem={updateCartItem} removeCartItem={removeCartItem} />
        </div>
    );
};

export default Shop;
