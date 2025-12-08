import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner} from 'react-bootstrap';
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // URL Hook for user searches
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearch = searchParams.get('search') || '';
    const currentCategory = searchParams.get('category') || '';
    const currentSort = searchParams.get('sort') || 'newest';

    // Fetching logic
    useEffect(() => {
        const fetchFilteredProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    search: currentSearch,
                    category: currentCategory,
                    sort: currentSort
                }).toString();
                const response = await axios.get(`http://127.0.0.1:8000/api/items?${params}`);
                setProducts(response.data);
            } catch (err) {
                console.error('API Error:', err);
            } finally {
                setLoading(false);
            }     
        };

        fetchFilteredProducts();
    }, [searchParams]);

    // Updates the URL when filtering is applied
    const handleSortChange = (e) => {
        setSearchParams({
            search: currentSearch,
            category: currentCategory,
            sort: e.target.value
        });
    };

    return (
        <Container className="my-5">
            <div className="header-section d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">
                        {currentCategory ? `${currentCategory} Collection`: `All Vinyls`}
                    </h2>
                    {currentSearch && <p className="text-muted">Showing results for "{currentSearch}"</p>}
                </div>
                <Form.Select 
                    className="sort-form"
                    value={currentSort}
                    onChange={handleSortChange}
                    style={{width: '200px'}}
                    aria-label="Sort Products"
                    >
                    <option value={'newest'}>Newest Arrivals</option>
                    <option value={"bestsellers"}>Best Sellers</option>
                    <option value={"alphabetical_asc"}>Alphabetical: A-Z</option>
                    <option value={"alphabetical_desc"}>Alphabetical: Z-A</option>
                    <option value={"price_low"}>Price: Low to High</option>
                    <option value={"price_high"}>Price: High to Low</option>
                </Form.Select>
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation='border' role="status" variant='primary'/>
                </div>
            ) : (
                <Row>
                    {products.length > 0 ? (
                        products.map((item) => (
                            <Col key={item.id} xs={6} md={4} lg={3}>
                                <Card className="h-100 border-0 shadow-sm">
                                    <Link to={`/product/${item.id}`}>
                                        <div className="item-cover-container">
                                            <Card.Img 
                                            variant="top" 
                                            src={item.cover_image_url || 'https://vectorified.com/images/disc-icon-3.png'}
                                            className="item-cover"
                                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                    </Link>

                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fw-bold text-truncate" title={item.title} style={{fontSize: '1rem'}}>
                                            {item.title}
                                        </Card.Title>
                                        <Card.Text className="text-muted small mb-2 text-truncate">
                                            {item.artists?.map(a => a.name).join(', ') || 'Unknown Artist'}
                                        </Card.Text>

                                        <div className="mt-auto d-flex justify-content-between align-items-center">
                                            <span className="fw-bold fs-5">${Number(item.price).toFixed(2)}</span>
                                            <Button variant="outline-dark" size="sm" className="rounded-circle">
                                                <i className="bi bi-cart-plus"></i>
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <div className="mb-3"><i className="bi bi-disc fs-1 text-muted"></i></div>
                            <h3>No vinyls found.</h3>
                            <p className="text-muted">Try checking your spelling and filters.</p>
                            <Button variant="primary" onClick={() => setSearchParams({})}>
                                Clear All Filters
                            </Button>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    )
};

export default ShopPage;