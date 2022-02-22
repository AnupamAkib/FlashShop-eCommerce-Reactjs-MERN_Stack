import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WholePackage from './components/package/WholePackage.js'
import CreateOrder from './components/order/CreateOrder.js'
import MyAllOrders from './components/order/MyAllOrders.js'
import Header from './components/header/Header.js'
import Footer from './components/footer/Footer.js'
import Admin from './components/admin/Admin.js'
import ViewAllOrderAdmin from './components/admin/manageOrder/ViewAllOrderAdmin.js'
import ViewPackage from './components/admin/managePackage/ViewPackage.js'
import CreatePackage from './components/admin/managePackage/CreatePackage.js'
import EditPackage from './components/admin/managePackage/EditPackage.js'
import TermsConditions from './components/TermsConditions.js'
import Contact from './components/Contact.js'
import Dashboard from './components/admin/Dashboard.js'
import Settings from './components/admin/Settings/Settings.js'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<WholePackage />} />
        <Route path='/conditions' element={<TermsConditions />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/order/:id' element={<CreateOrder />} />
        <Route path='/myOrder' element={<MyAllOrders />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/viewOrder' element={<ViewAllOrderAdmin />} />
        <Route path='/admin/package/view' element={<ViewPackage />} />
        <Route path='/admin/package/edit/:id' element={<EditPackage />} />
        <Route path='/admin/package/create' element={<CreatePackage />} />
        <Route path='/admin/settings' element={<Settings />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
