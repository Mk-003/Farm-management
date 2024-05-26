// import React, { useState, useEffect } from 'react';

// import './PatchServices.css';

// const PatchProduct = () => {
//     const [products, setProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [updatedProduct, setUpdatedProduct] = useState({
//         pet: '',
//         name: '',
//         description: '',
//         price: '',
//         image_url: '',
//         quantity_available: '',
//         type: ''
//     });

//     useEffect(() => {
//         // Fetch products from the backend
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('/userproducts');
//                 if (response.ok) {
//                     const data = await response.json();
//                     setProducts(data);
//                 } else {
//                     console.error('Failed to fetch products');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const handleProductSelect = (product) => {
//         setSelectedProduct(product);
//         setUpdatedProduct({
//             pet: product.pet,
//             name: product.name,
//             description: product.description,
//             price: product.price,
//             image_url: product.image_url,
//             quantity_available: product.quantity_available,
//             type: product.type
//         });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedProduct({ ...updatedProduct, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const productData = {
//             ...updatedProduct,
//             price: parseFloat(updatedProduct.price),
//             quantity_available: parseInt(updatedProduct.quantity_available, 10)
//         };

//         try {
//             const response = await fetch(`/userproducts/${selectedProduct.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(productData)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Product updated:', data);
//                 // Optionally, handle any post-update logic here, such as redirecting or displaying a success message
//             } else {
//                 const errorData = await response.json();
//                 console.error('Error updating product:', errorData);
//             }
//         } catch (error) {
//             console.error('There was an error updating the product!', error);
//         }
//     };

//     return (
//         <div className='update-products'>
//             <h2>Update Product</h2>
//             <select onChange={(e) => handleProductSelect(JSON.parse(e.target.value))}>
//                 <option>Select a product</option>
//                 {products.map((product) => (
//                     <option key={product.id} value={JSON.stringify(product)}>
//                         {product.name}
//                     </option>
//                 ))}
//             </select>
//             {selectedProduct && (
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label>Pet:</label>
//                         <input type="text" name="pet" value={updatedProduct.pet} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <label>Name:</label>
//                         <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} required />
//                     </div>
//                     <div>
//                         <label>Description:</label>
//                         <textarea name="description" value={updatedProduct.description} onChange={handleChange} required></textarea>
//                     </div>
//                     <div>
//                         <label>Price:</label>
//                         <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} required />
//                     </div>
//                     <div>
//                         <label>Image URL:</label>
//                         <input type="text" name="image_url" value={updatedProduct.image_url} onChange={handleChange} required />
//                     </div>
//                     <div>
//                         <label>Quantity Available:</label>
//                         <input type="number" name="quantity_available" value={updatedProduct.quantity_available} onChange={handleChange} required />
//                     </div>
//                     <div>
//                         <label>Type:</label>
//                         <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} required />
//                     </div>
//                     <button type="submit">Update Product</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default PatchProduct;




import React, { useState, useEffect } from 'react';
import './PatchProduct.css';

const PatchProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({
        pet: '',
        name: '',
        description: '',
        price: '',
        image_url: '',
        quantity_available: '',
        type: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await fetch('/userproducts');
                if (response.ok) {
                    const data = await response.json();
                    const filteredProducts = data.filter(item => item.type === 'product');
                    setProducts(filteredProducts);
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
            pet: product.pet,
            name: product.name,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
            quantity_available: product.quantity_available,
            type: product.type
        });
        setSuccessMessage(''); // Clear success message when a new product is selected
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            ...updatedProduct,
            price: parseFloat(updatedProduct.price),
            quantity_available: parseInt(updatedProduct.quantity_available, 10)
        };

        try {
            const response = await fetch(`/adminproducts/${selectedProduct.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Product updated:', data);
                setSuccessMessage('Product updated successfully!');
                // Clear form fields
                setSelectedProduct(null);
                setUpdatedProduct({
                    pet: '',
                    name: '',
                    description: '',
                    price: '',
                    image_url: '',
                    quantity_available: '',
                    type: ''
                });
            } else {
                const errorData = await response.json();
                console.error('Error updating product:', errorData);
                setSuccessMessage('Failed to update product.');
            }
        } catch (error) {
            console.error('There was an error updating the product!', error);
            setSuccessMessage('There was an error updating the product!');
        }
    };

    return (
        <div className='update-products'>
            <h2>Update Product</h2>
            {successMessage && <p className='success-message'>{successMessage}</p>}
            <select onChange={(e) => handleProductSelect(JSON.parse(e.target.value))}>
                <option>Select Product</option>
                {products.map((product) => (
                    <option key={product.id} value={JSON.stringify(product)}>
                        {product.name}
                    </option>
                ))}
            </select>
            {selectedProduct && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Pet:</label>
                        <input type="text" name="pet" value={updatedProduct.pet} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea name="description" value={updatedProduct.description} onChange={handleChange} required></textarea>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type="text" name="image_url" value={updatedProduct.image_url} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Quantity Available:</label>
                        <input type="number" name="quantity_available" value={updatedProduct.quantity_available} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Type:</label>
                        <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} required />
                    </div>
                    <button type="submit">Update Product</button>
                </form>
            )}
        </div>
    );
};

export default PatchProduct;
