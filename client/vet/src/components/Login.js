



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/userlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if(response.ok){
      alert(JSON.stringify(result));
      setFormData({
        username:'',
        password:'',
      });
      // Redirect to homepage
      navigate('/');
    } else{
      setError(result.error || 'Login failed');
      console.log('Error response:', result); // Debugging log
    }
    
    
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type={showPassword ? 'text' : 'password'} 
          name="password" value={formData.password} onChange={handleChange} required />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default UserLogin;


