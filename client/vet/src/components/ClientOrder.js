import React, { useEffect, useState } from 'react';
// import './clientOrder.css';

function ClientOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);
    
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:5555/orders", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders data:', error);
        }
    };
    
    /*
    const fetchOrders = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5555/orders");
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders data:', error);
        }
    };
    */

    return (
        <>
            {orders.length === 0 ? (
                <div className='no-orders'>
                    <h2>No Orders</h2>
                    <img src="/noOrders.jpg" alt="" />
                </div>   
            ) : (
                <div className="client-order-container">
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
                            
                            {order.products.map((product) => (
                                <div className="all-products" key={product.name}>
                                    <div className="single-product">
                                        <img src={product.image} alt="" />
                                        <div className="single-product-details">
                                            <span className='product-name'>{product.name}</span>
                                            <span className='product-price'>{product.price} <span className='secondaryText'>x{product.quantity}</span></span>
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

export default ClientOrder;