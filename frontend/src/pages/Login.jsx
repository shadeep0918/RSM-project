import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; // Reusing your beautiful CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password
      });
      // Save token to our Context Memory Bank
      login(response.data.token, response.data.role);
      
      // Send them to the right place based on their role
      if (response.data.role === 'ADMIN') {
        navigate('/admin'); // Admins go to the hidden dashboard
      } else {
        navigate('/'); // Customers go to the public store
      }
    } catch (error) {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="Container">
      <section className="form-section" style={{ maxWidth: '400px', margin: '4rem auto' }}>
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin} className="product-form" style={{ flexDirection: 'column' }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="glow-btn">Login</button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#059669', fontWeight: 'bold' }}>Sign Up</Link>
        </p>
      </section>
    </div>
  );
}

export default Login;