import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  
  // This state holds the data for the new product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Updates the state when you type in the input boxes
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Sends the new product to Spring Boot when you click "Add"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/products", newProduct);
      // Clear the form boxes
      setNewProduct({ name: '', description: '', price: '', category: '' });
      // Refresh the products list immediately!
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  return (
    <div className="Container">
      <header className="header">
        <h1>Aurora</h1>
        <p>Premium Herbal Products</p>
      </header>

      {/* --- ADD PRODUCT FORM --- */}
      <section className="form-section">
        <h2>Add a New Product</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} required />
          <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} required />
          <input type="number" name="price" placeholder="Price ($)" value={newProduct.price} onChange={handleInputChange} required />
          <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} required />
          <button type="submit" className="glow-btn">Add Product</button>
        </form>
      </section>

      {/* --- PRODUCT GRID --- */}
      <main className="product-grid">
        {products.length === 0 ? (
          <p>No products found in the database yet..!</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <span className="category-badge">{product.category}</span>
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