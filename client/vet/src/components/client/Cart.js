import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the user's cart when the component mounts
        fetch('/userCart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming JWT is stored in localStorage
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message !== 'Cart not found') {
                setCart(data);
            } else {
                setCart(null);
            }
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const addItemToCart = (productId, quantity) => {
        fetch('/userCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ product_id: productId, quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (cart) {
                setCart(prevCart => ({
                    ...prevCart,
                    cart_items: [...prevCart.cart_items, data]
                }));
            } else {
                setCart({ cart_items: [data] });
            }
        })
        .catch(error => setError(error));
    };

    const updateCartItem = (itemId, quantity) => {
        fetch(`/userCart/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ quantity })
        })
        .then(response => response.json())
        .then(data => {
            setCart(prevCart => ({
                ...prevCart,
                cart_items: prevCart.cart_items.map(item =>
                    item.id === itemId ? data : item
                )
            }));
        })
        .catch(error => setError(error));
    };

    const deleteCartItem = (itemId) => {
        fetch(`/userCart/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(() => {
            setCart(prevCart => ({
                ...prevCart,
                cart_items: prevCart.cart_items.filter(item => item.id !== itemId)
            }));
        })
        .catch(error => setError(error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!cart) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cart.cart_items.map(item => (
                    <li key={item.id}>
                        {item.product_id} - Quantity: {item.quantity}
                        <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
                        <button onClick={() => updateCartItem(item.id, item.quantity - 1)}>-</button>
                        <button onClick={() => deleteCartItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Add New Item</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const productId = e.target.productId.value;
                    const quantity = e.target.quantity.value;
                    addItemToCart(productId, quantity);
                }}>
                    <input type="text" name="productId" placeholder="Product ID" required />
                    <input type="number" name="quantity" placeholder="Quantity" required />
                    <button type="submit">Add to Cart</button>
                </form>
            </div>
        </div>
    );
};

export default Cart;
