import { useState } from 'react'
import { Navbar, Container, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
// import ShopPage from './pages/ShopPage';
import HomePage from './pages/HomePage/HomePage';
import Test from './pages/Test';
import TopNavbar from './components/TopNavbar';
import Footer from './components/Footer';
import ShopPage from './pages/ShopPage/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

function App() {
  const [count, setCount] = useState(0)

  return (
   
   <BrowserRouter>
  <TopNavbar></TopNavbar>
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/shop" element={<ShopPage />} /> */}
      {/* Fallback for unknown routes */}
      <Route path="*" element={<div className="container mt-5">Page Not Found</div>} />
      <Route path="/test" element={<Test />} />
      <Route path="/shop" element={<ShopPage products/>}/>
      <Route path="/product/:id" element={<div className="container mt-5"><ProductPage></ProductPage></div>} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
    <Footer></Footer>
   </BrowserRouter>
  )
}

export default App
