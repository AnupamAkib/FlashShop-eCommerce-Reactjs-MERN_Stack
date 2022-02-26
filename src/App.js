import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WholePackage from './components/package/WholePackage.js'
import CreateOrder from './components/order/CreateOrder.js'
import CreateSpecialOrder from './components/order/createSpecialOrder.js'
import MyAllOrders from './components/order/MyAllOrders.js'
import Header from './components/header/Header.js'
import Navbar from './components/header/Navbar.js'
import Footer from './components/footer/Footer.js'
import Admin from './components/admin/Admin.js'
import ViewAllOrderAdmin from './components/admin/manageOrder/ViewAllOrderAdmin.js'
import ViewPackage from './components/admin/managePackage/ViewPackage.js'
import CreatePackage from './components/admin/managePackage/CreatePackage.js'
import CreateSpecialPackage from './components/admin/managePackage/CreateSpecialPackage.js'
import EditPackage from './components/admin/managePackage/EditPackage.js'
import EditSpecialPackage from './components/admin/managePackage/EditSpecialPackage.js'
import TermsConditions from './components/TermsConditions.js'
import Contact from './components/Contact.js'
import Dashboard from './components/admin/Dashboard.js'
import Settings from './components/admin/Settings/Settings.js'
import AboutSite from './components/about';
import NotFound from './components/NotFound';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<WholePackage />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/conditions' element={<TermsConditions />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/order/:id' element={<CreateOrder />} />
        <Route path='/order/special/:id' element={<CreateSpecialOrder />} />
        <Route path='/myOrder' element={<MyAllOrders />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/viewOrder' element={<ViewAllOrderAdmin />} />
        <Route path='/admin/package/view' element={<ViewPackage />} />
        <Route path='/admin/package/edit/:id' element={<EditPackage />} />
        <Route path='/admin/package/edit/special/:id' element={<EditSpecialPackage />} />
        <Route path='/admin/package/create' element={<CreatePackage />} />
        <Route path='/admin/package/special/create' element={<CreateSpecialPackage />} />
        <Route path='/admin/settings' element={<Settings />} />
        <Route path='/about' element={<AboutSite />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
