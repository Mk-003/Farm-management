
import { useState, useEffect } from "react"






const Items=()=>{

    const [products, setProducts] = useState([]);
    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortOption, setSortOption] = useState('Default');
    const [filterOption, setFilterOption] = useState('All');

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  
  useEffect(() => {
    fetchProducts();
  }, [filterOption]);


  const fetchProducts = async () => {
    try {
      let url = '/userproducts';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const handleFilter = (event) => {
    setFilterOption(event.target.value);
  };

    return(
        <div>  
            <div>
                <select value={filterOption} onchange={handleFilter}>
                    <option value='View-Default'>View ALL </option>
                    <option value='View-Product-Option'>VIEW PRODUCTS</option>
                    <option value='View-Services-Option'>VIEW SERVICES</option>
                </select>
            </div>

        <select value={sortOption} onChange={handleSort}>
        <option value="Default">Default Sorting</option>
        <option value="Title">Sort By Name</option>
        <option value="Price-low">Sort By Price: low to high</option>
        <option value="Price-high">Sort By Price: high to low</option>
      </select>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}>
            <div onClick={() => handleProductClick(product)}>
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
            {selectedProduct && selectedProduct.id === product.id && (
              <div>
                <p>{product.description}</p>
                
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};
export default Items;









































