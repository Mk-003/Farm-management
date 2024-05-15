import React, { useState, useEffect } from 'react';

function History() {
    const [productsHistory, setProductsHistory] = useState([]);
    const [servicesHistory, setServicesHistory] = useState([]);

    useEffect(() => {
        // Fetch products/orders history
        fetchProductsHistory();
        // Fetch services history
        fetchServicesHistory();
    }, []);

    const fetchProductsHistory = async () => {
        try {
            const response = await fetch('/http://localhost:3000/productHistory');
            if (!response.ok) {
                throw new Error('Failed to fetch products history');
            }
            const data = await response.json();
            setProductsHistory(data);
        } catch (error) {
            console.error('Error fetching products history:', error);
        }
    };

    const fetchServicesHistory = async () => {
        try {
            const response = await fetch('/http://localhost:3000/serviceHistory');
            if (!response.ok) {
                throw new Error('Failed to fetch services history');
            }
            const data = await response.json();
            setServicesHistory(data);
        } catch (error) {
            console.error('Error fetching services history:', error);
        }
    };

    return (
        <div>
            <h2>Products-Orders Purchased History</h2>
            <ul>
                {productsHistory.map((product, index) => (
                    <li key={index}>
                        {product.name} - {product.quantity} - {product.date}
                    </li>
                ))}
            </ul>
            <h2>Services History</h2>
            <ul>
                {servicesHistory.map((service, index) => (
                    <li key={index}>
                        {service.name} - {service.date} - ${service.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default History;
