import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [sortOption, setSortOption] = useState('Default');

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

  const handleAddToCart = (service) => {
    // Implement add to cart functionality for services
    console.log('Added to cart:', service);
  };

  const handleSort = (event) => {
    const option = event.target.value;
    setSortOption(option);
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
      <div className="flexColStart p-head">
        <span className='orangeText'>Best Choices</span>
        <span className='primaryText'>Popular Categories</span>
      </div>
      <h2>SERVICES</h2>
      <select value={sortOption} onChange={handleSort}>
        <option value="Default">Default Sorting</option>
        <option value="Title">Sort By Name</option>
        <option value="Price-low">Sort By Price: low to high</option>
        <option value="Price-high">Sort By Price: high to low</option>
      </select>
      <div className="services-container">
        {services.map((service) => (
          <div key={service.id}>
            <div onClick={() => handleServiceClick(service)}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>Price: ${service.price}</p>
              <img src={service.image_url} alt={service.name} />
            </div>
            {selectedService && selectedService.id === service.id && (
              <div>
                <p>{service.description}</p>
                <button onClick={() => handleAddToCart(service)}>Add to Cart</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

