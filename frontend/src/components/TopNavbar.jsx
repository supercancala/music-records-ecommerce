import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import './TopNavbar.css';

const TopNavbar = () => {
    return (
        <div className="top-navbar sticky-top">
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
        </div>
    )
};

export default TopNavbar;