//post order to serviceorders. this i a booking
//


import React, { useEffect, useState } from 'react';

function ServiceOrder() {
    const [serviceOrders, setServiceOrders] = useState([]);

    useEffect(() => {
        fetchserviceOrders();
    }, []);
    
    const fetchserviceOrders = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:5555/serviceorders", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setServiceOrders(data);
        } catch (error) {
            console.error('Error fetching orders data:', error);
        }
    };

    return (
        <>
            {serviceOrders.length === 0 ? (
                <div className='no-orders'>
                    <h2>No Orders</h2>
                    <img src="/noOrders.jpg" alt="" />
                </div>   
            ) : (
                <div className="service-order-container">
                    {orders.map(order => (
                        <div className="order-card" key={order.order_id}>
                            <div className="order-details">
                                <div className="order-details-left">
                                    <span className='secondaryText'>Order ID</span>
                                    <span>#{order.order_id}</span>
                                </div>
                                <div className="order-details-right">
                                    <p>Status: <span className="order-status">{order.status}</span></p>
                                </div>
                            </div>
                            
                            {order.services.map((service) => (
                                <div className="all-services" key={service.name}>
                                    <div className="single-service">
                                        <img src={service.image} alt="" />
                                        <div className="single-service-details">
                                            <span className='service-name'>{service.name}</span>
                                            <span className='service-price'>{service.price} <span className='secondaryText'>x{service.quantity}</span></span>
                                        </div>  
                                    </div>
                                </div>
                            ))}
                            <p>Total Price: <span className="total-price"> ${order.total_price.toFixed(2)}</span></p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default ServiceOrder;
