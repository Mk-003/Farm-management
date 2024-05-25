// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userRole: null, // 'admin' or 'user'
  });

  const login = (role) => {
    setAuth({
      isAuthenticated: true,
      userRole: role,
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      userRole: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
