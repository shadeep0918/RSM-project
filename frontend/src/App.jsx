import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  
  // State for the text data
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  // NEW: State for the actual physical image file
  const [imageFile, setImageFile] = useState(null);

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

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // NEW: Saves the file when you click "Choose File"
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // UPDATED: Sends a "Multipart Form" with the physical file
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // We MUST use FormData to send files over the internet
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:8080/api/products", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Clear the form
      setNewProduct({ name: '', description: '', price: '', category: '' });
      setImageFile(null);
      document.getElementById("imageInput").value = ""; // Reset file UI
      
      fetchProducts(); // Refresh the grid
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

      <section className="form-section">
        <h2>Add a New Product</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} required />
          <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} required />
          <input type="number" name="price" placeholder="Price ($)" value={newProduct.price} onChange={handleInputChange} required />
          <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} required />
          
          {/* NEW: The File Upload Input */}
          <input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} required />
          
          <button type="submit" className="glow-btn">Add Product</button>
        </form>
      </section>

      <main className="product-grid">
        {products.length === 0 ? (
          <p>No products found in the database yet..!</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              
              {/* NEW: Display the image from our Spring Boot server! */}
              {product.imageUrl && (
                <img 
                  src={`http://localhost:8080${product.imageUrl}`} 
                  alt={product.name} 
                  className="product-image"
                />
              )}
              
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