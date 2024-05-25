
import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import Products from './Products';

const Shop = () => {
    const [cart, setCart] = useState([]);

    const addItemToCart = (productId, quantity) => {

        const token = localStorage.getItem('token');
    console.log('Token:', token); 

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
            console.log('Add to cart response:', data); // Debug log
            setCart(prevCart => [...prevCart, data]);
        })
        .catch(error => console.error('Error adding item to cart:', error));
    };
    

    return (
        <div>
            <Products addItemToCart={addItemToCart} />
            <Cart cart={cart} />
        </div>
    );
};

export default Shop;
