import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css'; // Import the CSS file for styling

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const[whitelistItems,setWhitelistItems]=useState([]);

  useEffect(() => {
    fetch(`/userproducts/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    console.log('Added to cart:', product);
  };
  const handleAddToWhitelist = (product) => {
    setWhitelistItems([...whitelistItems, product]);
    console.log('Added to whitelist:', product);
  };

  if (loading) {
    return <div className="product-page-loading">Loading...</div>;
  }

  if (!product) {
    return <div className="product-page-not-found">Product not found</div>;
  }

  return (
    <div className="product-page">
      <h1 className="product-page-title">{product.name}</h1>
      <img className="product-page-image" src={product.image_url} alt={product.name} />
      <p className="product-page-description">{product.description}</p>
      <p className="product-page-price">Price: ${product.price}</p>
      <button className="product-page-add-to-cart" onClick={() => handleAddToCart(product)}>
        Add to Cart
      </button>
      <button className="product-page-add-to-whitelist" onClick={() => handleAddToWhitelist(product)}>
          Add to Whitelist
        </button>
    </div>
  );
};

export default ProductPage;
