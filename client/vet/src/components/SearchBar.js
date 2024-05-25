// import React, { useState } from 'react';
// import './SearchBar.css';


// function SearchBar() {
//   const [searchParams, setSearchParams] = useState({
//     name: '',
//     description: '',
//     type: ''
//   });
//   const [products, setProducts] = useState([]);

//   const handleChange = (e) => {
//     setSearchParams({
//       ...searchParams,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSearch = async () => {
//     const query = new URLSearchParams(searchParams).toString();
//     const response = await fetch(`/userproducts?${query}`);
//     const data = await response.json();
//     setProducts(data);
//   };

//   return (
//     <div>
//       <h2>Search Products</h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={searchParams.name}
//         onChange={handleChange}
//       />
      
//       <input
//         type="text"
//         name="type"
//         placeholder="Type"
//         value={searchParams.type}
//         onChange={handleChange}
//       />
//       <button onClick={handleSearch}>Search</button>
//       <div>
//         <h3>Results:</h3>
//         <ul>
//           {products.map(product => (
//             <li key={product.id}>
//               {product.name} - {product.description} - ${product.price}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    name: '',
    description: '',
    type: ''
  });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    const query = new URLSearchParams(searchParams).toString();
    const response = await fetch(`/userproducts?${query}`);
    const data = await response.json();
    setProducts(data);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div>
      <h2>Search Products</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={searchParams.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={searchParams.type}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h3>Results:</h3>
        <ul>
          {products.map(product => (
            <li key={product.id} onClick={() => handleProductClick(product)}>
              <img src={product.image_url} alt={product.name} width="50" height="50" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
