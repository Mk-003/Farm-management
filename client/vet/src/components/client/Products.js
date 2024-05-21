import React, { useState, useEffect } from 'react';
import './Product.css';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState('Default');

  useEffect(() => {
    

  fetch('/userproducts')
  .then(response =>response.json())
  .then(data =>{
    const filteredProducts= data.filter(item => item.type === 'product');
    setProducts(filteredProducts);
  });
},[]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    console.log('Added to cart:', product);
  };

  // const handleRemoveFromCart = (product) => {
  //   setCartItems(cartItems.filter((item) => item.id !== product.id));
  // };

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
      {/* <div className="flexColStart p-head">
        <span className='orangeText'>Best Choices</span>
        <span className='primaryText'>Popular Categories</span>
      </div> */}
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
              <p>Price: ${product.price}</p>
              
            </div>
            {selectedProduct && selectedProduct.id === product.id && (
              <div>
                
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Products;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('/userproducts');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) {
//     console.error(error); // Log the error for debugging
//     return <div>Error loading products: {error.message}</div>;
//   }

//   return (
//     <div>
//       {products.length === 0 ? (
//         <div>No products available</div>
//       ) : (
//         <ul>
//           {products.map(product => (
//             <li key={product.id}>
//               <Link to={`/products/${product.id}`}>{product.name}</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ProductList;
