// import './rightProducts.css'
import React, { useState } from 'react';


function AddProducts(){

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        quantity_available: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            // Optionally, you can reset the form fields here
            setFormData({
                name: '',
                description: '',
                price: '',
                image_url: '',
                quantity_available: ''
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return(
        <div className="right-products">
            <div className="right-products-form">
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
                        <label htmlFor="image_url">Image Url</label>
                        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL" required />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>

        </div>
    )
}

export default AddProducts