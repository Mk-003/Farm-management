import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '', // This will be sent as phone_number
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const requestBody = {
      username: formData.username,
      email: formData.email,
      phone_number: formData.phoneNumber, // Convert to snake_case
      password: formData.password,
      confirm_password: formData.confirmPassword, // Convert to snake_case
    };

    console.log('Submitting data:', requestBody); // Debugging log

    const response = await fetch('/userRegister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    if (response.ok) {
      alert(JSON.stringify(result));
      // Clear form fields after successful registration
      setFormData({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/login')
    } else {
      setError(result.error || 'Registration failed');
      console.log('Error response:', result); // Debugging log
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={toggleShowConfirmPassword}>
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegister;
