// HomePage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function HomePage() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <h2>Home Page</h2>
      {auth.isAuthenticated && auth.userRole === 'admin' ? (
        <button onClick={() => window.location.href = '/admin/navbar'}>Admin Section</button>
      ) : (
        <Link to="/admin-login">
          <button>Admin Login</button>
        </Link>
      )}
    </div>
  );
}

export default HomePage;
