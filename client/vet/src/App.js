
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/client/NavBar'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/client/Products';
import Services from './components/client/Services';

import Navbar2 from './components/admin/AdminNavBar';

import ProductPost from './components/admin/ProductPost';
import ServicePost from './components/admin/ServicePost';
import DeleteProduct from './components/admin/DeleteProduct';
import DeleteService from './components/admin/DeleteService';
import PatchProduct from './components/admin/PatchProduct';
import PatchService from './components/admin/PatchService';
import History from './components/admin/History';
import ProductDetail from './components/client/ProductPage';



function App() {
  return (
    <div>
    <Router>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' component={ProductDetail} />
        <Route path='/services' element={<Services />} />
        
      </Routes>

      <Routes>
      <Route path='/productPost' element={<ProductPost />} />
      <Route path='/ServicePost' element={<ServicePost />} />
      <Route path='/deleteProduct' element={<DeleteProduct />} />
      <Route path='/deleteService' element={<DeleteService />} />
      <Route path='/history' element={<History />} />
      <Route path='/patchProduct' element={<PatchProduct />} />
      <Route path='/patchService' element={<PatchService />} />
      
      </Routes>
      <Navbar2 />
    </Router>
    </div>
  );
}

export default App;







