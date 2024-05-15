// import React, { useState, useEffect } from 'react';

// const UpdateService = () => {
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [updatedService, setUpdatedService] = useState({
//     name: '',
//     description: '',
//     price: 0,
//     quantity: 0,
//     image_url: '',
//     image: null
//   });

//   useEffect(() => {
//     // Fetch services from the backend
//     const fetchServices = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/services');
//         if (response.ok) {
//           const data = await response.json();
//           setServices(data);
//         } else {
//           console.error('Failed to fetch services');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
//     fetchServices();
//   }, []);

//   const handleServiceSelect = (service) => {
//     setSelectedService(service);
//     setUpdatedService({
//       name: service.name,
//       description: service.description,
//       price: service.price,
//       quantity: service.quantity,
//       image_url: service.image_url,
//       image: null
//     });
//   };

//   const handleUpdateService = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/services/${selectedService.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedService),
//       });
//       if (response.ok) {
//         // Show success message
//       } else {
//         // Handle error (e.g., show error message)
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className='update-services'>
//       <h2>Update Service</h2>
//       <select onChange={(e) => handleServiceSelect(JSON.parse(e.target.value))}>
//         <option>Select a service</option>
//         {services.map((service) => (
//           <option key={service.id} value={JSON.stringify(service)}>
//             {service.name}
//           </option>
//         ))}
//       </select>
//       {selectedService && (
//         <div>
//           <input type="text" value={updatedService.name} onChange={(e) => setUpdatedService({ ...updatedService, name: e.target.value })} placeholder="Name" required  />
//           <input type="text" value={updatedService.description} onChange={(e) => setUpdatedService({ ...updatedService, description: e.target.value })} placeholder="Description" required  />
//           <input type="number" value={updatedService.price} onChange={(e) => setUpdatedService({ ...updatedService, price: parseFloat(e.target.value) })} placeholder="Price" required  />
//           <input type="number" value={updatedService.quantity} onChange={(e) => setUpdatedService({ ...updatedService, quantity: parseInt(e.target.value) })} placeholder="Quantity" required  />
//           <input type="text" value={updatedService.image_url} onChange={(e) => setUpdatedService({ ...updatedService, image_url: e.target.value })} placeholder="url" required  />
//           <input type="file" onChange={handleImageChange} accept="image/*" placeholder="Image" required />
//           <button className='update-service-button' onClick={handleUpdateService}>Update Service</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateService;




// const handleImageChange = (event) => {
//   const file = event.target.files[0];
//   setUpdatedService({ ...updatedService, image: file });
// };


import React, { useState, useEffect } from 'react';

import './PatchServices.css';

const PatchService = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [updatedService, setUpdatedService] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image_url: '',
    image: null // New state for the uploaded image
  });

  useEffect(() => {
    // Fetch services from the backend
    const fetchServices = async () => {
      try {
        const response = await fetch('/adminservices');
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

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setUpdatedService({
      name: service.name,
      description: service.description,
      price: service.price,
      quantity: service.quantity,
      image_url: service.image_url,
      image: null // Reset the image when selecting a new service
    });
  };

  const handleUpdateService = async () => {
    try {
      const formData = new FormData();
      formData.append('name', updatedService.name);
      formData.append('description', updatedService.description);
      formData.append('price', updatedService.price);
      formData.append('quantity', updatedService.quantity);
      formData.append('image', updatedService.image); // Append the image to the form data

      const response = await fetch(`/adminservices/${selectedService.id}`, {
        method: 'PATCH',
        body: formData
      });
      if (response.ok) {
        // Show success message
      } else {
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUpdatedService({ ...updatedService, image: file });
  };

  return (
    <div className='update-services'>
      <h2>Update Service</h2>
      <select onChange={(e) => handleServiceSelect(JSON.parse(e.target.value))}>
        <option>Select a service</option>
        {services.map((service) => (
          <option key={service.id} value={JSON.stringify(service)}>
            {service.name}
          </option>
        ))}
      </select>
      {selectedService && (
        <div>
          <input type="text" value={updatedService.name} onChange={(e) => setUpdatedService({ ...updatedService, name: e.target.value })} placeholder="Name" required  />
          <input type="text" value={updatedService.description} onChange={(e) => setUpdatedService({ ...updatedService, description: e.target.value })} placeholder="Description" required  />
          <input type="number" value={updatedService.price} onChange={(e) => setUpdatedService({ ...updatedService, price: parseFloat(e.target.value) })} placeholder="Price" required  />
          <input type="number" value={updatedService.quantity} onChange={(e) => setUpdatedService({ ...updatedService, quantity: parseInt(e.target.value) })} placeholder="Quantity" required  />
          <input type="file" onChange={handleImageChange} accept="image/*" /> {/* Input for image upload */}
          <button onClick={handleUpdateService}>Update Service</button>
        </div>
      )}
    </div>
  );
};

export default PatchService;
