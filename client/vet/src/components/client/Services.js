import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  // const [selectedService, setSelectedService] = useState(null);
  const [displayOption, setDisplayOption] = useState('Default');
  const [cartItems, setCartItems] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    fetch('/userproducts')
      .then(response => response.json())
      .then(data => {
        const filteredServices = data.filter(item => item.type === 'service');
        setServices(filteredServices);
      });
  }, []);

  const handleServiceClick = (service) => {
    navigate(`/service/${service.id}`)
  };

  const handleAddToCart = (service) => {
    setCartItems([...cartItems, service]);
    console.log('Added to cart:', service);
    console.log('Current cart items:', [...cartItems, service]);
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
      <h2>DISPLAY VIEW</h2>
      <select value={displayOption} onChange={handleDisplay}>
        <option value="Default">Default Display</option>
        <option value="Title">Display By Name</option>
        <option value="Price-low"> By Price: low to high</option>
        <option value="Price-high">By Price: high to low</option>
      </select>
      <div className="services-container">
        {services.map((service) => (
          <div key={service.id}>
            <div onClick={() => handleServiceClick(service)}>
              <img src={service.image_url} alt={service.name} />
              <h3>{service.name}</h3>
              <p>Price: kes{service.price}</p>
              <p>{service.description}</p>
            </div>
                <button onClick={() => handleAddToCart(service)}>Add to Cart</button>
              </div>

        ))}
      </div>
    </div>
  );
};

export default Services;


