import { useContext, useEffect, useState } from 'react';
import { cartContext } from "../context/Context";
import { NavLink } from "react-router-dom";

function ClientCart() {
    const { state, dispatch } = useContext(cartContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Any side effects can be handled here, if needed
    }, []);

    const total = state.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const res = await fetch('http://127.0.0.1:5555/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include the access token from local storage
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`, 
                },
                body: JSON.stringify({
                    total: total,
                    items: state.map(item => ({ id: item.id, quantity: item.quantity })),
                }),
            });

            if (res.ok) {
                setSuccess(true);
                // Clear the cart after successful order placement
                dispatch({ type: 'CLEAR_CART' });
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

    return (
        <div className="client-cart-page">
            {state.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <img src="https://iconscout.com/lottie-animation/empty-shopping-cart-3580543" alt="" />
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
                        {state.map((item, index) => (
                            <div className="client-cart-card" key={index}>
                                <div className="product-details">
                                    <img src={item.image_url} alt={item.name} />
                                    <div className="product-name">
                                        <p>{item.name}</p>
                                        <button onClick={() => dispatch({ type: 'REMOVE', payload: item })}>Remove</button>
                                    </div>   
                                </div>
                                <p>${item.price}</p>
                                <div className="quantity">
                                    <button onClick={() => dispatch({ type: 'DECREASE', payload: item })}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch({ type: 'INCREASE', payload: item })}>+</button>
                                </div>
                                <p className='total-price'>${item.quantity * item.price}</p>
                            </div>
                        ))}
                        <div className="total">
                            <h4>Subtotal</h4>
                            <h4>${total}</h4>
                        </div>
                        <div className="checkout-button">
                            <button className='button' onClick={handlePlaceOrder}>Checkout</button>
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

export default ClientCart;
