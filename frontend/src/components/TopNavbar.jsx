import React, {useState} from "react";
import { Navbar, Container, Nav, Form, FormControl, Button, Badge, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


const TopNavbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('records');
    const { cartCount } = useCart();

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return; // Don't search for empty strings

        if (searchType === 'artits') {
            navigate(`/artists?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="sticky-top" style={{zIndex:1020}}>
        <Navbar bg='dark' variant='dark' expand='lg' className='py-3'>
            <Container fluid>
            <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
                    Mora Limpia Records
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    {/* 2. Search Bar (Centered) */}
                    <Form className="d-flex mx-auto" style={{ width: '60%', maxWidth: '700px' }} onSubmit={handleSearch}>
                        <InputGroup>
                            {/* A. The Dropdown (Left side) */}
                            <Form.Select 
                            style={{ maxWidth: '120px', backgroundColor: '#f8f9fa' }}
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            aria-label="Search Type"
                            >
                            <option value="records">Records</option>
                            <option value="artists">Artists</option>
                            </Form.Select>

                            {/* B. The Text Input */}
                            <FormControl
                            type="search"
                            placeholder={searchType === 'artists' ? "Search for a band..." : "Search for albums..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search"
                            />

                            {/* C. The Button */}
                            <Button variant="primary" type="submit">
                            <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Form>
                    {/* 3. Right Side Icons */}
                    <Nav className="ms-auto align-items-center">
                    <Nav.Link as={Link} to="/cart" className="text-white me-3 position-relative">
                        <i className="bi bi-cart2"></i> Cart 
                        {/* Only show badge if we have items */}
                        {cartCount > 0 && (
                        <Badge 
                            bg="danger" 
                            className="ms-1" 
                            style={{ fontSize: '0.75rem' }} 
                        >
                            {cartCount > 99 ? '99+' : cartCount}
                        </Badge>
                        )}
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