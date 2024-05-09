import { useEffect,useState } from "react";


function ClientServices(){

   const[services,setServices]=useState("")  

   useEffect(()=>{
      fetch("/services")
        .then(response =>response.json())
        .then((data) =>{
            setServices(data);
        })
        .catch(error =>{
            console.error('Error fetching services data:', error);
        });
   []});


    return(
    <div className="services-container">
     {services.map((service) =>(
       <div key={service.id}>
         <img src={image_url} alt="category"/>
         <span className="secondaryText p-price">
                            <span style={{color:"orange"}}>$</span>
                            <span>{service.price}</span>
         </span>
                        <span className='primaryText'>{service.name}</span>
                        <span className='secondaryText'>{service.description}</span>
                        {/* <button className="p-buttons" onClick={() => dispatch({type:'ADD', payload:product})}>Add to cart</button> */}
         </div>
     ))}
    </div>
    )
}

export default ClientServices;