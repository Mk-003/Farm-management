




import './PostProducts.css';




import React, { useState } from 'react';

function ProductTextualForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        pet: '',
        name: '',
        description: '',
        price: '',
        quantity_available: ''
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
            const response = await fetch('/products/textual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            const data = await response.json();
            onSubmit(data.id);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="pet" value={formData.pet} onChange={handleChange} placeholder="Pet" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
            <input type="number" name="quantity_available" value={formData.quantity_available} onChange={handleChange} placeholder="Quantity Available" />
            <button type="submit">Create Product</button>
        </form>
    );
}

function ProductImageForm({ productId }) {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('product_id', productId);
            images.forEach((image) => {
                formData.append('images', image);
            });
            const response = await fetch('/products/images', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Failed to upload images');
            }
            console.log('Images uploaded successfully');
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="images" onChange={handleImageChange} accept="image/*" multiple />
            <button type="submit">Upload Images</button>
        </form>
    );
}

function ProductCreationPage() {
    const [productId, setProductId] = useState(null);

    const handleProductCreated = (id) => {
        setProductId(id);
    };

    return (
        <div>
            <h1>Create Product</h1>
            {!productId ? (
                <ProductTextualForm onSubmit={handleProductCreated} />
            ) : (
                <ProductImageForm productId={productId} />
            )}
        </div>
    );
}

export default ProductCreationPage;
