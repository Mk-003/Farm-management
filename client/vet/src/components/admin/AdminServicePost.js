// import './rightServices.css'
import React, { useState } from 'react';

function AddServices(){

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        
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
            const response = await fetch('http://localhost:3000/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to create service');
            }
            // Optionally, you can reset the form fields here
            setFormData({
                name: '',
                description: '',
                price: ''
            });
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };

    return(
        <div className="services">
            <div className="services-form">
                <span>Add A Service</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Service Name</label>
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
                    
                    <button type="submit">Add Service</button>
                </form>
            </div>
        </div>
    )
}

export default AddServices;
