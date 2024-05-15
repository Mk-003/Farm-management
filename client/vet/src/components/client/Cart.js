import React, { useState } from 'react';
import './Cart.css';






const Cart = () => {
  const [cart, setCart] = useState([]);

  

  // Function to remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  // Function to calculate total price of items in cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className='cart-component'>
        {cart.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button className='remove-btn' onClick={() => removeFromCart(product.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <h4>Total: kes{calculateTotalPrice()}</h4>
      </div>
    </div>
  );
};

export default Cart;
