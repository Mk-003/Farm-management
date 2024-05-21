import React, { useState } from 'react';
import './PostService.css' 

const PostProduct = () => {
    const [product, setProduct] = useState({
        pet: '',
        name: '',
        description: '',
        price: '',
        image_url: '',
        quantity_available: '',
        type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the price and quantity are properly parsed as numbers
        const productData = {
            ...product,
            price: parseFloat(product.price),
            quantity_available: parseInt(product.quantity_available, 10),
            type: String(product.type,)  // Ensure type is a string
        };

        try {
            const response = await fetch('/adminproducts', {  // Corrected URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Product added:', data);
                // Clear the form or provide feedback to the user
                setProduct({
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
                console.error('Error adding product:', errorData);
            }
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    return (
        <form className="post-product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Pet:</label>
                <input
                    className="form-input"
                    type="text"
                    name="pet"
                    value={product.pet}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Name:</label>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label">Description:</label>
                <textarea
                    className="form-input"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label className="form-label">Price:</label>
                <input
                    className="form-input"
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label">Image URL:</label>
                <input
                    className="form-input"
                    type="text"
                    name="image_url"
                    value={product.image_url}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label">Quantity Available:</label>
                <input
                    className="form-input"
                    type="number"
                    name="quantity_available"
                    value={product.quantity_available}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label">Type:</label>
                <input
                    className="form-input"
                    type="text"
                    name="type"
                    value={product.type}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className="form-button" type="submit">Add SERVICE</button>
        </form>
    );
};

export default PostProduct;
