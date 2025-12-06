import React, { useEffect, useState} from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Runs once when the page loads
    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/items');

                console.log("Data from laravel:", response.data); // Debugging
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError('Failed to connect to the backend.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div className="banner bg-dark text-white text-center py-5 ">
            <Container className='text-center'>
            <h1 className="display-3 fw-bold">The Sound of Authenticity</h1>
            <p className="lead mb-4">Discover rare vinyls, limited editions, and timeless classics.</p>
            <Button as={Link} to="/shop" size="lg" className="px-5 btn-transparent text-dark pill-btn">Shop Now!</Button>
            </Container>
            </div>

            {/* Carousel I */}
            <Container className='my-5'>
                <h2 className='mb-4'>Database Test</h2>
                {loading && <div className='text-center p-5'>Loading your vinyls...</div>}
                {error && <div className='text-center text-danger p-5'>{error}</div>}

                {!loading && !error && (
                    <ProductCarousel products={products}/>
                )}
            </Container>
        </>
    )
}

export default HomePage;