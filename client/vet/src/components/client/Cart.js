// Cart.js
import React from 'react';





const Cart = ({ cartItems, onRemoveFromCart }) => {
  const totalItems = cartItems.length;



  return (
    <div className="cart">
      <h2>Cart</h2>
      <p>Total Items: {totalItems}</p>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <button onClick={() => onRemoveFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

