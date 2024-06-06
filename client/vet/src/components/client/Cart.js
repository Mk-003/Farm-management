// import React, { useState, useEffect } from 'react';
// import './Cart.css';
// import { NavLink } from 'react-router-dom';

// function Cart() {
//     const [cartItems, setCartItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(false);

//     useEffect(() => {
//         const fetchCartItems = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch('/userCart', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     setCartItems(data);
//                 } else {
//                     setError('Failed to fetch cart items');
//                 }
//             } catch (error) {
//                 setError('An error occurred while fetching cart items');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCartItems();
//     }, []);

//     const handlePlaceOrder = async () => {
//         setLoading(true);
//         setError(null);
//         setSuccess(false);

//         try {
//             const res = await fetch('/userProductOrders', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify({
//                     total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
//                     items: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
//                 }),
//             });

//             if (res.ok) {
//                 setSuccess(true);
//                 setCartItems([]);
//             } else {
//                 setError('Failed to place order');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('An error occurred while processing your request');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRemove = async (itemToRemove) => {
//         try {
//             const res = await fetch(`/userCart/${itemToRemove.id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             if (res.ok) {
//                 setCartItems(cartItems.filter(item => item.id !== itemToRemove.id));
//             } else {
//                 setError('Failed to remove item from cart');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('An error occurred while removing the item from the cart');
//         }
//     };

//     const handleIncrease = async (itemToIncrease) => {
//         try {
//             const updatedQuantity = itemToIncrease.quantity + 1;
//             const res = await fetch(`/userCart/${itemToIncrease.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify({ quantity: updatedQuantity })
//             });
//             if (res.ok) {
//                 setCartItems(cartItems.map(item => 
//                     item.id === itemToIncrease.id ? { ...item, quantity: updatedQuantity } : item
//                 ));
//             } else {
//                 setError('Failed to update item quantity');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('An error occurred while updating the item quantity');
//         }
//     };

//     const handleDecrease = async (itemToDecrease) => {
//         if (itemToDecrease.quantity <= 1) return;
//         try {
//             const updatedQuantity = itemToDecrease.quantity - 1;
//             const res = await fetch(`/userCart/${itemToDecrease.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify({ quantity: updatedQuantity })
//             });
//             if (res.ok) {
//                 setCartItems(cartItems.map(item => 
//                     item.id === itemToDecrease.id ? { ...item, quantity: updatedQuantity } : item
//                 ));
//             } else {
//                 setError('Failed to update item quantity');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('An error occurred while updating the item quantity');
//         }
//     };

//     const total = cartItems.reduce((total, item) => {
//         return total + item.price * item.quantity;
//     }, 0);

//     return (
//         <div className="client-cart-page">
//             {cartItems.length === 0 ? (
//                 <div className="empty-cart">
//                     <h2>Your cart is empty</h2>
//                     <img src="https://cdn.dribbble.com/users/675297/screenshots/4334597/basti.gif" alt="Empty Cart" />
//                 </div>            
//             ) : (
//                 <>
//                     <h2>Shopping Cart</h2>
//                     <div className="client-cart">
//                         <div className="client-cart-titles">
//                             <h4>Product</h4>
//                             <h4>Price</h4>
//                             <h4>Quantity</h4>
//                             <h4>Total</h4>
//                         </div>
//                         {cartItems.map((item, index) => (
//                             <div className="client-cart-card" key={index}>
//                                 <div className="product-details">
//                                     <img src={item.image_url} alt={item.name} />
//                                     <div className="product-name">
//                                         <p>{item.name}</p>
//                                         <button onClick={() => handleRemove(item)}>Remove</button>
//                                     </div>   
//                                 </div>
//                                 <p>ksh{item.price}</p>
//                                 <div className="quantity">
//                                     <button 
//                                         onClick={() => handleDecrease(item)}
//                                         disabled={item.quantity <= 1}
//                                     >-</button>
//                                     <span>{item.quantity}</span>
//                                     <button onClick={() => handleIncrease(item)}>+</button>
//                                 </div>
//                                 <p className='total-price'>ksh{item.quantity * item.price}</p>
//                             </div>
//                         ))}
//                         <div className="total">
//                             <h4>Subtotal</h4>
//                             <h4>ksh{total}</h4>
//                         </div>
//                         <div className="checkout-button">
//                             <button className='button' onClick={handlePlaceOrder} disabled={loading}>
//                                 {loading ? 'Processing...' : 'Checkout'}
//                             </button>
//                             {error && <p className="error">{error}</p>}
//                             {success && <p className="success">Order placed successfully!</p>}
//                         </div>
//                         <div className="continue-shopping">
//                             <NavLink className="client-nav-link" to='/products'> Continue Shopping</NavLink>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Cart;


// Cart.js
import React, { useState, useEffect } from 'react';
import './Cart.css';
import { NavLink } from 'react-router-dom';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const response = await fetch('/userCart', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
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

    const handleRemove = async (itemToRemove) => {
        try {
            const res = await fetch(`/userCart/${itemToRemove.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.ok) {
                setCartItems(cartItems.filter(item => item.id !== itemToRemove.id));
            } else {
                setError('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while removing the item from the cart');
        }
    };

    const handleIncrease = async (itemToIncrease) => {
        try {
            const updatedQuantity = itemToIncrease.quantity + 1;
            const res = await fetch(`/userCart/${itemToIncrease.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ quantity: updatedQuantity })
            });
            if (res.ok) {
                setCartItems(cartItems.map(item => 
                    item.id === itemToIncrease.id ? { ...item, quantity: updatedQuantity } : item
                ));
            } else {
                setError('Failed to update item quantity');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while updating the item quantity');
        }
    };

    const handleDecrease = async (itemToDecrease) => {
        if (itemToDecrease.quantity <= 1) return;
        try {
            const updatedQuantity = itemToDecrease.quantity - 1;
            const res = await fetch(`/userCart/${itemToDecrease.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ quantity: updatedQuantity })
            });
            if (res.ok) {
                setCartItems(cartItems.map(item => 
                    item.id === itemToDecrease.id ? { ...item, quantity: updatedQuantity } : item
                ));
            } else {
                setError('Failed to update item quantity');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while updating the item quantity');
        }
    };

    const total = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const config = {
        public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY, // Replace with your Flutterwave public key
        tx_ref: Date.now(),
        amount: total,
        currency: 'KES',
        payment_options: 'card, mobilemoney, ussd',
        customer: {
            email: 'customer-email@example.com', // Replace with actual customer email
            phonenumber: '08012345678', // Replace with actual customer phone number
            name: 'Customer Name', // Replace with actual customer name
        },
        customizations: {
            title: 'VET MASHINANI',
            description: 'Payment for items in cart',
            logo: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
        },
    };

    const fwConfig = {
        ...config,
        text: 'Checkout',
        callback: async (response) => {
            console.log(response);
            if (response.status === 'successful') {
                try {
                    const res = await fetch('/userProductOrders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            total: total,
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
                }
            } else {
                setError('Payment was not successful');
            }
            closePaymentModal(); // This will close the modal programmatically
        },
        onClose: () => {},
    };

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
                                <p>ksh{item.price}</p>
                                <div className="quantity">
                                    <button 
                                        onClick={() => handleDecrease(item)}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item)}>+</button>
                                </div>
                                <p className='total-price'>ksh{item.quantity * item.price}</p>
                            </div>
                        ))}
                        <div className="total">
                            <h4>Subtotal</h4>
                            <h4>ksh{total}</h4>
                        </div>
                        <div className="checkout-button">
                            <FlutterWaveButton {...fwConfig} />
                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">Order placed successfully!</p>}
                        </div>
                        <div className="continue-shopping">
                            <NavLink className="client-nav-link" to='/products'> Continue Shopping</NavLink>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
