


import React, { useState } from 'react';

import './PostProducts.css';

function ProductPost(){

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null, // New state for the uploaded image
        quantity_available: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            image: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append('name', formData.name);
            formDataWithImage.append('description', formData.description);
            formDataWithImage.append('price', formData.price);
            formDataWithImage.append('quantity_available', formData.quantity_available);
            formDataWithImage.append('image', formData.image);

            const response = await fetch('/adminproducts', {
                method: 'POST',
                body: formDataWithImage,
            });
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            // Optionally, you can reset the form fields here
            setFormData({
                name: '',
                description: '',
                price: '',
                image: null,
                quantity_available: ''
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return(
        <div className="post-products">
            <div className="post-products-form">
                <span>Add A Product</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                    </div>
                    <div>
                        <label htmlFor="quantity_available">Quantity</label>
                        <input type="number" name="quantity_available" value={formData.quantity_available} onChange={handleChange} placeholder="Quantity Available" required />
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default ProductPost;
