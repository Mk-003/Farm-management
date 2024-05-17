import React, { useState, useEffect } from 'react';
import Cart from './Cart';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState('Default');

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('/userproducts');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    console.log('Added to cart:', product);
  };

  const handleRemoveFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
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
        // Default sorting
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <div>
      <div className="flexColStart p-head">
        <span className='orangeText'>Best Choices</span>
        <span className='primaryText'>Popular Categories</span>
      </div>
      <h2>PRODUCTS</h2>
      <select value={sortOption} onChange={handleSort}>
        <option value="Default">Default Sorting</option>
        <option value="Title">Sort By Name</option>
        <option value="Price-low">Sort By Price: low to high</option>
        <option value="Price-high">Sort By Price: high to low</option>
      </select>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}>
            <div onClick={() => handleProductClick(product)}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <img src={product.image_url} alt={product.name} />
            </div>
            {selectedProduct && selectedProduct.id === product.id && (
              <div>
                <p>{product.description}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                
              </div>
            )}
          </div>
        ))}
      </div>
      <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
};

export default Products;
