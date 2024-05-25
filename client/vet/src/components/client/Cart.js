// 




import React, { useState, useEffect } from 'react';
import './Cart.css';
import { NavLink } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const response = await fetch('/userCart', { // Relative URL
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data.cart_items);
                } else {
                    setError('Failed to fetch cart items');
                }
            } catch (error) {
                setError('An error occurred while fetching cart items');
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch('/userProductOrders', { // Relative URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                    items: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
                }),
            });

            if (res.ok) {
                setSuccess(true);
                setCartItems([]);
            } else {
                setError('Failed to place order');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = (itemToRemove) => {
        setCartItems(cartItems.filter(item => item.id !== itemToRemove.id));
    };

    const handleIncrease = (itemToIncrease) => {
        setCartItems(cartItems.map(item => 
            item.id === itemToIncrease.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrease = (itemToDecrease) => {
        setCartItems(cartItems.map(item => 
            item.id === itemToDecrease.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const total = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <div className="client-cart-page">
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <img src="https://cdn.dribbble.com/users/675297/screenshots/4334597/basti.gif" alt="Empty Cart" />
                </div>            
            ) : (
                <>
                    <h2>Shopping Cart</h2>
                    <div className="client-cart">
                        <div className="client-cart-titles">
                            <h4>Product</h4>
                            <h4>Price</h4>
                            <h4>Quantity</h4>
                            <h4>Total</h4>
                        </div>
                        {cartItems.map((item, index) => (
                            <div className="client-cart-card" key={index}>
                                <div className="product-details">
                                    <img src={item.image_url} alt={item.name} />
                                    <div className="product-name">
                                        <p>{item.name}</p>
                                        <button onClick={() => handleRemove(item)}>Remove</button>
                                    </div>   
                                </div>
                                <p>${item.price}</p>
                                <div className="quantity">
                                    <button 
                                        onClick={() => handleDecrease(item)}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item)}>+</button>
                                </div>
                                <p className='total-price'>${item.quantity * item.price}</p>
                            </div>
                        ))}
                        <div className="total">
                            <h4>Subtotal</h4>
                            <h4>${total}</h4>
                        </div>
                        <div className="checkout-button">
                            <button className='button' onClick={handlePlaceOrder} disabled={loading}>
                                {loading ? 'Processing...' : 'Checkout'}
                            </button>
                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">Order placed successfully!</p>}
                        </div>
                        <div className="continue-shopping">
                            <NavLink className="client-nav-link" to='/client/products'> Continue Shopping</NavLink>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;





