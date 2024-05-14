import React from 'react';
import './App.css';

import DeleteService from './components/admin/DeleteService';
import AProducts from './components/admin/DeleteProduct';
import AddProducts from './components/admin/AdminProductsPost';
import AddServices from './components/admin/AdminServicePost';
// import AdminHistory from './components/admin/History';




function App() {
  return (
    <div>
     <AProducts />
      <DeleteService />
      <AddProducts />
      <AddServices />
      {/* <AdminHistory /> */}
    </div>
  );
}

export default App;











