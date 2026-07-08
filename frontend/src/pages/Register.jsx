import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
        role: "CUSTOMER" // Force all new signups to be normal customers!
      });
      alert("Registration successful! Please login.");
      navigate('/login');
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="Container">
      <section className="form-section" style={{ maxWidth: '400px', margin: '4rem auto' }}>
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister} className="product-form" style={{ flexDirection: 'column' }}>
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="glow-btn">Sign Up</button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#059669', fontWeight: 'bold' }}>Login</Link>
        </p>
      </section>
    </div>
  );
}

export default Register;