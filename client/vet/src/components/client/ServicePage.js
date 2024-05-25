import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ServicePage.css'; // Import the CSS file for styling

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
//   const [whitelistItems, setWhitelistItems] = useState([]);

  useEffect(() => {
    fetch(`/userproducts/${id}`)
      .then(response => response.json())
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching service:', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (service) => {
    setCartItems([...cartItems, service]);
    console.log('Added to cart:', service);
  };

//   const handleAddToWhitelist = (service) => {
//     setWhitelistItems([...whitelistItems, service]);
//     console.log('Added to whitelist:', service);
//   };

  if (loading) {
    return <div className="service-page-loading">Loading...</div>;
  }

  if (!service) {
    return <div className="service-page-not-found">Service not found</div>;
  }

  return (
    <div className="service-page">
      <h1 className="service-page-title">{service.name}</h1>
      <img className="service-page-image" src={service.image_url} alt={service.name} />
      <p className="service-page-description">{service.description}</p>
      <p className="service-page-price">Price: ${service.price}</p>
      <button className="service-page-add-to-cart" onClick={() => handleAddToCart(service)}>
        Add to Cart
      </button>
      {/* <button className="service-page-add-to-whitelist" onClick={() => handleAddToWhitelist(service)}>
        Add to Whitelist
      </button> */}
    </div>
  );
};

export default ServicePage;
