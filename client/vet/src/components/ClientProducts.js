import React, {useContext,  useEffect, useState } from "react";
// import './Product.css';
import { cartContext } from "./context/Context";

function ClientProducts(){
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('Default'); // State to hold the current sorting option

    useEffect(() => {
        fetch("/products")
          .then(resp => resp.json())
          .then((data) => {
            setProducts(data);
          })
          .catch(error => {
            console.error('Error fetching products data:', error);
          });
    }, []);

    
    const globalState = useContext(cartContext) || { dispatch: () => {} };
const { dispatch } = globalState;


    // Function to handle sorting based on the selected option
    const handleSort = (event) => {
        const option = event.target.value;
        setSortOption(option);
        let sortedProducts = [...products];

        switch (option) {
            case 'Title':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                // Default sorting
                break;
        }

        setProducts(sortedProducts);
    };

    return (
        <div className='products'>
            <div className="flexColStart p-head">
                <span className='orangeText'>Best Choices</span>
                <span className='primaryText'>Popular Categories</span>
            </div>
            <div className="products-content">
                <p>Showing all {products.length} results</p>
                <select value={sortOption} onChange={handleSort}>
                    <option value="Default">Default Sorting</option>
                    <option value="Title">Sort By Name</option>
                    <option value="Price-low">Sort By Price: low to high</option>
                    <option value="Price-high">Sort By Price: high to low</option>
                </select>
            </div>
            <div className="products-container">
                {products.map((product) => (
                    <div className="flexColStart p-card" key={product.id}>
                        <img src={product.image_url} alt="category"/>
                        <span className="secondaryText p-price">
                            <span style={{color:"orange"}}>$</span>
                            <span>{product.price}</span>
                        </span>
                        <span className='primaryText'>{product.name}</span>
                        <span className='secondaryText'>{product.description}</span>
                        <button className="p-buttons" onClick={() => dispatch({type:'ADD', payload:product})}>Add to cart</button>
                    </div>
                ))}
            </div>
         </div>
    )

}

export default ClientProducts;
