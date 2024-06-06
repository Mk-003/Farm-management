import React, { useEffect, useState } from "react";

const AdminProductOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/adminProductOrders')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching orders!');
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, []);

    const handleApproval = (itemId, action) => {
        const url = action === 'approve' ? `/approve_item/${itemId}` : `/disapprove_item/item/${itemId}`;
        fetch(url, { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error with ${action} action!`);
                }
                console.log(response.data.message);
                return fetch('/adminProductOrders');
            })
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    return (
        <div>
            <h1>Admin Product Orders</h1>
            {orders.map(order => (
                <div key={order.order_id}>
                    <h2> Order {order.order_id}</h2>
                    <p> Total Price: ${order.total_price}</p>
                    <p>User ID: {order.user_id}</p>
                    <p>Status: {order.status}</p>
                    <h3>Items:</h3>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.product_id}>
                                <p>Product Name: {item.product_name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price} </p>
                                <p>Approval status: {item.approval_status} </p>
                                <button onClick={() => handleApproval(item.product_id, 'approve')}>APPROVE</button>
                                <button onClick={() => handleApproval(item.product_id, 'disapprove')}>DISAPPROVE</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
};

export default AdminProductOrders;
