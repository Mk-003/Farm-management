// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element, role, ...rest }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated || auth.userRole !== role) {
    return <Navigate to="/admin-login" />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
