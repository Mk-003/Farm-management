import { useEffect, useState } from "react";





function AService() {
    const [services, setServices] = useState([]);

    

    useEffect(() => {
        fetch("http://localhost:3000/services")
            .then(resp => resp.json())
            .then((data) => {
                setServices(data);
            })
            .catch(error => {
                console.error('Error fetching products data:', error);
            });
    }, []);

    

    
    const handleDelete = (serviceId) => {
        fetch(`http://localhost:3000/services/${serviceId}`, {
            method: 'DELETE',
        })
            .then(resp => {
                if (resp.ok) {
                    // Remove the deleted product from the state
                    setServices(services.filter(service => service.id !== serviceId));
                } else {
                    console.error('Error deleting product');
                }
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    return (
        <div className='services-delete'>
            
            <div className="services-content">
                <p>Showing all {services.length} results</p>
                
            </div>
            <div className="services-container">
                {services.map((service) => (
                    <div className="flexColStart p-card" key={service.id}>
                        <img src={service.image_url} alt="category"/>
                        <span className="secondaryText p-price">
                            <span style={{color:"orange"}}>$</span>
                            <span>{service.price}</span>
                        </span>
                        <span className='primaryText'>{service.name}</span>
                        <span className='secondaryText'>{service.description}</span>
                        
                        <button className="delete-service-btn" onClick={() => handleDelete(service.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AService;