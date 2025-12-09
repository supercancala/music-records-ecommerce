import React, {useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge, Spinner, Image } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
    const { id } = useParams();
    const [ product, setProduct ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const { addToCart } = useCart();

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error(err);
                setError("Could not load product details. Product might not exist")
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return (
        <Container className='text-center py-5'>
            <Spinner animation='border'/>
        </Container>
    );
    
    if (error || !product) return (
        <Container className='py-5'>
            <h2 className='text-danger'>Error</h2>
            <p>{error}</p>
            <Link to='/shop'>Back to Shop</Link>
        </Container>
    );

    return (
        <Container className='my-5'>
            <div className='mb-4'>
                <Link to='/' className='text-decoration-none text-muted'>Home</Link>
                <span className='mx-2'>/</span>
                <Link to='/shop' className='text-decoration-non text-muted'>Shop</Link>
                <span className='mx-2'>/</span>
                <span className='text-dark fw-bold'>{product.title}</span>
            </div>

            <Row>
                {/* Left column: Cover Art */}
                <Col lg={6} className='mb-4 text-center'>
                    <Image
                        src={product.cover_image_url || 'https://vectorified.com/images/disc-icon-3.png'}
                        fluid
                        className='shadow-lg rounded'
                        style={{ maxHeight:'500px', maxWidth:'100%', objectFit: 'cover'}}
                    />
                </Col>

                {/* Right column: Product Details */}
                <Col md={6}>
                    <h1 className='display-4 fw-bold mb-0'>{product.title}</h1>
                    <h6 className='text-muted text-uppercase letter-spacing-2'>
                        {product.genres?.map(g => g.name).join(', ') || 'Genre'}
                    </h6>
                    <h3 className='text-muted fw-light mb-4'>
                        by <span className='text-dark'>
                            {product.artists?.map(a => a.name).join(', ') || 'Unknown Artist'}
                        </span>
                    </h3>

                    <div className='d-flex align-items-center mb-4'>
                        <h2 className='text-primary fw-bold mb-0 me-3'>
                            ${Number(product.price).toFixed(2)}
                        </h2>
                        {product.stock_quantity > 0 ? (
                            <Badge bg="success" className="px-3 py-2">In Stock</Badge>
                            ) : (
                            <Badge bg="danger" className="px-3 py-2">Out of Stock</Badge>
                            )}
                    </div>
                    
                    <div className='d-grid gap-2 col-md-8 mb-4'>
                        <Button
                            variant='dark'
                            size='lg'
                            className='py-3 fw-bold text-uppercase'
                            disabled={product.stock_quantity <= 0}
                            onClick={() => {
                                addToCart(product);
                                alert(`${product.title} added to cart!`);
                            }}
                        >
                            <i className='bi bi-cart-plus me-2'></i>
                            {product.stock_quantity > 0 ? 'Add to Cart' : 'Sold Out!'}
                        </Button>
                    </div>

                    <div className="bg-light p-4 rounded">
                        <h5 className="fw-bold">About this Record</h5>
                        <p className="text-muted mb-0" style={{ whiteSpace: 'pre-line' }}>
                        {product.description || "No description available for this classic."}
                        </p>
                        
                        <hr className="my-3" />
                        
                        <div className="small text-muted">
                        <strong>Release Date:</strong> {product.release_date || 'Unknown'} <br/>
                        <strong>Country:</strong> {product.country || 'International'} <br/>
                        <strong>Stock:</strong> {product.stock_quantity} units available
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;