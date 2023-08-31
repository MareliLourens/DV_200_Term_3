import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Products from './pages/products';
import IndividualProduct from './pages/individual_product';
import Landing from './pages/landing';
import Login from './pages/login';
import Admin from './pages/admin';
import OrderP from './pages/orderp';
import Cart from './pages/cart';
import { CartProvider } from './components/CartContext';
import BasicNav from './components/navbar';
import AdminNav from './components/admin_nav';
import Footer from './components/footer';

function App() {
  const location = useLocation();
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  useEffect(() => {
    const pathsWithoutHeaderFooter = ['/'];
    setShowHeaderFooter(!pathsWithoutHeaderFooter.includes(location.pathname));
  }, [location]);

  const isAdminOrOrderpPage = location.pathname === '/admin' || location.pathname === '/orderp';

  return (
    <>
      {showHeaderFooter && (isAdminOrOrderpPage ? <AdminNav /> : <BasicNav />)}
      <CartProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/character/:_id" element={<IndividualProduct />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/orderp" element={<OrderP />} />
        </Routes>
      </CartProvider>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;