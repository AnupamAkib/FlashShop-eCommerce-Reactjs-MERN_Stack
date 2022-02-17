import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WholePackage from './components/package/WholePackage.js'
import CreateOrder from './components/order/CreateOrder.js'
import MyAllOrders from './components/order/MyAllOrders.js'
import Header from './components/header/Header.js'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<WholePackage />} />
        <Route path='/order/:id' element={<CreateOrder />} />
        <Route path='/myOrder' element={<MyAllOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
