import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Calling our Spring Boot Backend on port 8080!
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  return (
    <div className="Container">
      <header className="header">
        <h1>Aurora</h1>
        <p>Premium Herbal Products</p>
      </header>

      <main className="product-grid">
        {products.length === 0 ? (
          <p>No product found in the database yet..! </p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">${product.price}</span>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;