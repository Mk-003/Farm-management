

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('Default');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/userproducts')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(item => item.type === 'product');
        setProducts(filteredProducts);
      });
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const fetchCartItems = async () => {
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
        console.log(data);
      } else {
        console.log('Failed to fetch cart items');
      }
    } catch (error) {
      console.log('An error occurred while fetching cart items', error.message);
    } finally {
      console.log("completed the operation");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      console.log(product);
      const response = await fetch('/userCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });

      if (response.ok) {
        const cartItem = await response.json();
        console.log("Added successfully", cartItem);
        fetchCartItems();
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSort = (event) => {
    const option = event.target.value;
    setSortOption(option);
    let sortedProducts = [...products];

    switch (option) {
      case 'Title':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <div>
      <h2>PRODUCTS</h2>
      <select value={sortOption} onChange={handleSort}>
        <option value="Default">DEFAULT VIEW</option>
        <option value="Title">VIEW BY NAME</option>
        <option value="Price-low">By Price: low to high</option>
        <option value="Price-high"> Price: high to low</option>
      </select>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}>
            <div onClick={() => handleProductClick(product)}>
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ksh{product.price}</p>
            </div>
            <div className="addToCart">
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
