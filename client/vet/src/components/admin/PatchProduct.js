// import React, { useState, useEffect } from 'react';

// const UpdateProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [updatedProduct, setUpdatedProduct] = useState({
//     name: '',
//     description: '',
//     price: 0,
//     quantity: 0,
//     image_url: '',
//     image: null
//   });

//   useEffect(() => {
//     // Fetch products from the backend
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/products');
//         if (response.ok) {
//           const data = await response.json();
//           setProducts(data);
//         } else {
//           console.error('Failed to fetch products');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//     setUpdatedProduct({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       quantity: product.quantity,
//       image_url: product.image_url,
//       image: null
//     });
//   };

//   const handleUpdateProduct = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedProduct),
//       });
//       if (response.ok) {
//         // Show success message
//       } else {
//         // Handle error (e.g., show error message)
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // const handleImageChange = (e) => {
//   //   // Handle image change logic here
//   //   const image = e.target.files[0];
//   //   // Do something with the file
//   // };

//   return (
//     <div className='update-products'>
//       <h2>Update Product</h2>
//       <select onChange={(e) => handleProductSelect(JSON.parse(e.target.value))}>
//         <option>Select a product</option>
//         {products.map((product) => (
//           <option key={product.id} value={JSON.stringify(product)}>
//             {product.name}
//           </option>
//         ))}
//       </select>
//       {selectedProduct && (
//         <div>
//           <input type="text" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} placeholder="Name" required  />
//           <input type="text" value={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} placeholder="Description" required  />
//           <input type="number" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })} placeholder="Price" required  />
//           <input type="number" value={updatedProduct.quantity} onChange={(e) => setUpdatedProduct({ ...updatedProduct, quantity: parseInt(e.target.value) })} placeholder="Quantity" required  />
//           <input type="text" value={updatedProduct.image_url} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image_url: e.target.value })} placeholder="url" required  />
//           <input type="file" onChange={handleImageChange} accept="image/*" placeholder="Image" required />
//           <button className='update-product-button' onClick={handleUpdateProduct}>Update Product</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateProduct;


import React, { useState, useEffect } from 'react';

import './PatchProduct.css';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image_url: '',
    image: null // New state for the uploaded image
  });

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
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

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      image_url: product.image_url,
      image: null // Reset the image when selecting a new product
    });
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', updatedProduct.name);
      formData.append('description', updatedProduct.description);
      formData.append('price', updatedProduct.price);
      formData.append('quantity', updatedProduct.quantity);
      formData.append('image', updatedProduct.image); // Append the image to the form data

      const response = await fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
        method: 'PATCH',
        body: formData
      });
      if (response.ok) {
        // Show success message
      } else {
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUpdatedProduct({ ...updatedProduct, image: file });
  };

  return (
    <div className='update-products'>
      <h2>Update Product</h2>
      <select onChange={(e) => handleProductSelect(JSON.parse(e.target.value))}>
        <option>Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={JSON.stringify(product)}>
            {product.name}
          </option>
        ))}
      </select>
      {selectedProduct && (
        <div>
          <input type="text" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} placeholder="Name" required  />
          <input type="text" value={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} placeholder="Description" required  />
          <input type="number" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })} placeholder="Price" required  />
          <input type="number" value={updatedProduct.quantity} onChange={(e) => setUpdatedProduct({ ...updatedProduct, quantity: parseInt(e.target.value) })} placeholder="Quantity" required  />
          <input type="file" onChange={handleImageChange} accept="image/*" /> {/* Input for image upload */}
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
