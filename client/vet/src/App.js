
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/client/NavBar'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/client/Products';
import Services from './components/client/Services';
import ProductPage from './components/client/ProductPage';
import ServicePage from './components/client/ServicePage';


// import {  AuthProvider } from './components/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

import Navbar2 from './components/admin/AdminNavBar';
import ProductPost from './components/admin/ProductPost';
import ServicePost from './components/admin/ServicePost';
import DeleteProduct from './components/admin/DeleteProduct';
import DeleteService from './components/admin/DeleteService';
import PatchProduct from './components/admin/PatchProduct';
import PatchService from './components/admin/PatchService';
import History from './components/admin/History';
import AdminLogin from './components/AdminLogin';
import Cart from './components/client/Cart';

// import ProductDetail from './components/client/ProductPage';




function App() {
  return (
    
     
    <Router>
      <Navbar />
    <Routes>
      <Route path="/product/:id" element={<ProductPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='/services' element={<Services />} />
        <Route path='/service/:id' element={<ServicePage/>} />
        <Route path='/adminlogin' element={<AdminLogin />} />
      <Route path='/productPost' element={<ProductPost />} />
      <Route path='/ServicePost' element={<ServicePost />} />
      <Route path='/deleteProduct' element={<DeleteProduct />}  />
      <Route path='/deleteService' element={<DeleteService />} />
      <Route path='/history' element={<History />} />
      <Route path='/patchProduct' element={<PatchProduct />} />
      <Route path='/patchService' element={<PatchService />} />
      <Route path='/cart' element={<Cart />} />
      
      </Routes>
      <Navbar2 />
    </Router>
   
    
  );
}

export default App;







// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Navbar from './components/client/NavBar'
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import Products from './components/client/Products';
// import Services from './components/client/Services';
// import ProductPage from './components/client/ProductPage';
// import ServicePage from './components/client/ServicePage';

// import { AuthProvider } from './components/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminLogin from './components/AdminLogin';
// import ProductPost from './components/admin/ProductPost';
// import ServicePost from './components/admin/ServicePost';
// import DeleteProduct from './components/admin/DeleteProduct';
// import DeleteService from './components/admin/DeleteService';
// import PatchProduct from './components/admin/PatchProduct';
// import PatchService from './components/admin/PatchService';
// import History from './components/admin/History';

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Navbar />
// //         <Routes>
// //           <Route path="/product/:id" element={<ProductPage />} />
// //           <Route path="/" element={<Home />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/products" element={<Products />} />
// //           <Route path="/services" element={<Services />} />
// //           <Route path="/service/:id" element={<ServicePage />} />
// //           <Route path="/adminlogin" element={<AdminLogin />} />
// //           <ProtectedRoute path="/productPost" element={<ProductPost />} role="admin" />
// //           <ProtectedRoute path="/servicePost" element={<ServicePost />} role="admin" />
// //           <ProtectedRoute path="/deleteProduct" element={<DeleteProduct />} role="admin" />
// //           <ProtectedRoute path="/deleteService" element={<DeleteService />} role="admin" />
// //           <ProtectedRoute path="/history" element={<History />} role="admin" />
// //           <ProtectedRoute path="/patchProduct" element={<PatchProduct />} role="admin" />
// //           <ProtectedRoute path="/patchService" element={<PatchService />} role="admin" />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/product/:id" element={<ProductPage />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/service/:id" element={<ServicePage />} />
//           <Route path="/adminlogin" element={<AdminLogin />} />
//           <ProtectedRoute path="/productPost" element={<ProductPost />} role="admin">
//             <Route path="/productPost" element={<ProductPost />} />
//           </ProtectedRoute>
//           <ProtectedRoute path="/servicePost" element={<ServicePost />} role="admin">
//             <Route path="/servicePost" element={<ServicePost />} />
//           </ProtectedRoute>
//           <ProtectedRoute path="/deleteProduct" element={<DeleteProduct />} role="admin">
//             <Route path="/deleteProduct" element={<DeleteProduct />} />
//           </ProtectedRoute>
//           <ProtectedRoute path="/deleteService" element={<DeleteService />} role="admin">
//             <Route path="/deleteService" element={<DeleteService />} />
//           </ProtectedRoute>
//           <ProtectedRoute path="/history" element={<History />} role="admin">
//             <Route path="/history" element={<History />} />
//           </ProtectedRoute>
//           <ProtectedRoute path="/patchProduct" element={<PatchProduct />} role="admin">
//             <Route path="/patchProduct" element={<PatchProduct />} />
//           </ProtectedRoute>
//           <ProtectedRoute path="/patchService" element={<PatchService />} role="admin">
//             <Route path="/patchService" element={<PatchService />} />
//           </ProtectedRoute>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }
// export default App;