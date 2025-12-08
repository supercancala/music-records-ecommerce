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

function App() {
  const [count, setCount] = useState(0)

  const mockItem = {
  // Use a temporary link that works, or your real data
  // cover_image_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fis1-ssl.mzstatic.com%2Fimage%2Fthumb%2FMusic114%2Fv4%2Fe5%2F24%2Faa%2Fe524aacd-467b-66f3-8931-0fcd6750a4b9%2F08UMGIM07914.rgb.jpg%2F1200x1200bf-60.jpg&f=1&nofb=1&ipt=32df85e09e931d62d277c302c06d7f3d96238ee1d7aff949f8c218120924f113', 
  cover_image_url: null,
  title: 'A Love Supreme',
  // ... and any other properties your component might eventually need
};

  return (
   
   <BrowserRouter>
  <TopNavbar></TopNavbar>
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/shop" element={<ShopPage />} /> */}
      {/* Fallback for unknown routes */}
      <Route path="*" element={<div className="container mt-5">Page Not Found</div>} />
      <Route path="/test" element={<Test item={mockItem}/>} />
      <Route path="/shop" element={<ShopPage products/>}/>
      <Route path="/product/:id" element={<div className="container mt-5"><h1>Product Details Coming Soon...</h1></div>} />

    </Routes>
    <Footer></Footer>
   </BrowserRouter>
  )
}

export default App
