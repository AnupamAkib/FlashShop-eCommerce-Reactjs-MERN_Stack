import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WholePackage from './components/package/WholePackage.js'
import CreateOrder from './components/order/CreateOrder.js'
import MyAllOrders from './components/order/MyAllOrders.js'
import Header from './components/header/Header.js'
import Admin from './components/admin/Admin.js'
import ViewAllOrderAdmin from './components/admin/manageOrder/ViewAllOrderAdmin.js'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<WholePackage />} />
        <Route path='/order/:id' element={<CreateOrder />} />
        <Route path='/myOrder' element={<MyAllOrders />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/viewOrder' element={<ViewAllOrderAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
