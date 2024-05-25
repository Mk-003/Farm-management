import React,{useState, useEffect} from "react";
import io from 'socket.io-client';



const socket = io('http://localhost:5000');


export const Notification =() =>{
    const[notifications,setNotifications] = useState([])

    useEffect(() => {
        socket.on('connect', () =>{
            console.log('Connected to server');
        });
        socket.on('new_product', (product) =>{
            setNotifications((prevNotifications)=>[product, ...prevNotifications ]);
            alert('New product added: ${product.name}');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from Server');
        });
        return ()=> {
            socket.off('new_product');
        };
    },[]);

    return(
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        New Product: {notification.name} - {notification.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};
