import { useEffect, useState } from "react";

import './DeleteProduct.css';



function DeleteProduct() {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch("/adminproducts")
            .then(resp => resp.json())
            .then((data) => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products data:', error);
            });
    }, []);

    

   
    const handleDelete = (productId) => {
        fetch(`/adminproducts/${productId}`, {
            method: 'DELETE',
        })
            .then(resp => {
                if (resp.ok) {
                    // Remove the deleted product from the state
                    setProducts(products.filter(product => product.id !== productId));
                } else {
                    console.error('Error deleting product');
                }
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    return (
        <div className='delete-products'>
            
            <div className="delete-products-content">
                <p>Showing all {products.length} Products results</p>
                
            </div>
            <div className="delete-products-container">
                {products.map((product) => (
                    <div className="flexColStart p-card" key={product.id}>
                        <img src={product.image_url} alt="category"/>
                        <span className="secondaryText p-price">
                            <span style={{color:"Gold"}}>kes</span>
                            <span>{product.price}</span>
                        </span>
                        <span className='primaryText'>{product.name}</span>
                        <span className='secondaryText'>{product.description}</span>
                        
                        <button className="delete-product-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DeleteProduct;
