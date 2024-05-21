import { useEffect, useState } from "react";

import './DeleteService.css';



function DeleteService() {
  

    const [services, setServices] = useState([]);
    
    useEffect(() => {
        fetch("/adminproducts")
            .then(resp => resp.json())
            .then((data) => {
                // Filter products with type 'product'
                const filteredServices = data.filter(item => item.type === 'service');
                setServices(filteredServices);
            })
            .catch(error => {
                console.error('Error fetching products data:', error);
            });
    }, []);

    const handleDelete = async (serviceId) => {
        try {
            const resp = await fetch(`/adminproducts/${serviceId}`, {
                method: 'DELETE',
            });
            if (resp.ok) {
                // Remove the deleted product from the state
                setServices(services.filter(service => service.id !== serviceId));
            } else {
                console.error('Error deleting product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className='services-delete'>
            
            <div className="services-content">
                <p>DISPLAYING all {services.length} Available SERVICES </p>
                
            </div>
            <div className="services-container">
                {services.map((service) => (
                    <div className="flexColStart s-card" key={service.id}>
                        <img src={service.image_url} alt="category"/>
                        <span className="secondaryText s-price">
                            <span style={{color:"gold"}}>kes</span>
                            <span>{service.price}</span>
                        </span>
                        <span className='primaryText'>{service.name}</span>
                        {/* <span className='secondaryText'>{service.description}</span> */}
                        
                        <button className="delete-service-btn" onClick={() => handleDelete(service.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DeleteService;