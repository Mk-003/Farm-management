import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/client/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/client/Products';
import Services from './components/client/Services';


function App() {
  return (
    <div>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='/services' element={<Services />} />
      </Routes>
    </div>
  );
}

export default App;











