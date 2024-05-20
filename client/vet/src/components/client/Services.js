import React, { useState, useEffect } from 'react';
import './Services.css';


const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [displayOption, setDisplayOption] = useState('Default');

  useEffect(() => {
    // Fetch services from the backend
    const fetchServices = async () => {
      try {
        const response = await fetch('/userservices');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleAddToBook = (service) => {
    // Implement add to cart functionality for services
    console.log('Added to cart:', service);
  };

  const handleDisplay = (event) => {
    const option = event.target.value;
    setDisplayOption(option);
    let sortedServices = [...services];

    switch (option) {
      case 'Title':
        sortedServices.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Price-low':
        sortedServices.sort((a, b) => a.price - b.price);
        break;
      case 'Price-high':
        sortedServices.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting
        break;
    }

    setServices(sortedServices);
  };

  return (
    <div>
      <div className="flexColStart s-head">
        <span className='orangeText'>Best Choices</span>
        <span className='primaryText'>Popular Categories</span>
      </div>
     <h2>DISPLAY BY</h2>
      <select value={displayOption} onChange={handleDisplay}>
        <option value="Default">Default Display</option>
        <option value="Title">Display By Name</option>
        <option value="Price-low">Display By Price: low to high</option>
        <option value="Price-high">Display By Price: high to low</option>
      </select>
      <div className="services-container">
        {services.map((service) => (
          <div key={service.id}>
            <div onClick={() => handleServiceClick(service)}>
            <img src={service.image_url} alt={service.name} />
              <h3>{service.name}</h3>
              <p>Price: ${service.price}</p>
              <p>{service.description}</p>
              
              
            </div>
            {selectedService && selectedService.id === service.id && (
              <div>
                <p>{service.description}</p>
                <button className='service-button' onClick={() => handleAddToBook(service)}>BOOK</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

