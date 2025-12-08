import React, { useEffect, useState} from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
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
                {!loading && (
                    <ProductCarousel 
                        title="New Releases" 
                        products={products.slice(0, 10)} 
                        viewAllLink="/shop?sort=newest"
                    />
                )}


                {!loading && (
                    <ProductCarousel 
                        title="Best Sellers" 
                        products={products.slice(10, 20)} 
                        viewAllLink="/shop?sort=bestsellers"
                    />
                )}

                <ProductCarousel 
                        title="Jazz Classics" 
                        products={products.filter(p => p.genres && p.genres.some(g => g.name === 'Jazz')).slice(0, 10)} 
                        viewAllLink="/shop?category=Rock"
                    />
                )}
            </Container>
        </>
    )
}

export default HomePage;