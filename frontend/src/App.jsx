import { useState } from 'react'
import { Navbar, Container, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
// import ShopPage from './pages/ShopPage';
import HomePage from './pages/HomePage';
import Test from './pages/Test';

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
   <Navbar bg='dark' variant='dark' expand='lg' className='py-3'>
    <Container fluid>
      <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
            Mora Limpia Records
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            {/* 2. Search Bar (Centered) */}
            <Form className="d-flex mx-auto" style={{ width: '50%', maxWidth: '600px' }}>
              <FormControl
                type="search"
                placeholder="Search for artists, albums..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>

            {/* 3. Right Side Icons */}
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/cart" className="text-white me-3 position-relative">
                <i className="bi bi-cart2"></i> Cart 
                {/* Cart Badge Placeholder */}
                <Badge bg="danger" className="ms-1">0</Badge>
              </Nav.Link>
              
              <Nav.Link as={Link} to="/login" className="text-white">
                <i className="bi bi-person-circle"></i> Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
    </Container>
   </Navbar>

   <div className="bg-teal">
        <Container fluid>
          <Nav className="justify-content-around py-2 ">
            <Nav.Link as={Link} to="/shop" className="fw-bold text-white">Shop</Nav.Link>
            <Nav.Link as={Link} to="/shop?sort=newest" className="fw-bold text-white">Newest In</Nav.Link>
            <Nav.Link as={Link} to="/shop?sort=bestsellers" className="fw-bold text-white">Best Sellers</Nav.Link>
            <Nav.Link as={Link} to="/artists" className="fw-bold text-white">Artists</Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-bold text-white">About Us</Nav.Link>
          </Nav>
        </Container>
      </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/shop" element={<ShopPage />} /> */}
      {/* Fallback for unknown routes */}
      <Route path="*" element={<div className="container mt-5">Page Not Found</div>} />
      <Route path="/test" element={<Test item={mockItem}/>} />
    </Routes>

   </BrowserRouter>
  )
}

export default App
