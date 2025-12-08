import React, { useRef } from 'react';
import { Carousel, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCarousel.css';

const ProductCarousel = ({ products, title, viewAllLink }) => {
    // Create a reference to control the scroll container
    const scrollRef = useRef(null);

    // Scroll logic
    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 300;
            current.scrollBy({
                // If direction is left, scrollAmount is negative
                left: direction === "left" ? -scrollAmount : scrollAmount
            });
        } 
    }

    
    if (!products || products.length === 0) {
        return <div className='text-center p-5'>No products to display.</div>;
    }

    return (
        <div className='mb-5'>
            {/* Header Section */}
            <div className='d-flex justify-content-between align-items-end mb-3 px-2'>
                <h2 className='mb-0 fw-bold'>{title || 'Featured'}</h2>

                {viewAllLink && (
                    <Link to={viewAllLink} className='view-all-link text-decoration-none fw-bold'>
                        See More <i className='bi bi-chevron-right small'></i>
                    </Link>
                )}
            </div>
            
            {/* Carousel Wrapper */}
            <div className='position-relative'>
            
            {/* Left scroll button */}
            <Button 
                className='arrow-btn position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-flex align-items-center justify-content-center'
                onClick={() => scroll('left')}
            >
                <i className='bi bi-chevron-left'></i>
            </Button>
            {/* Scroll container */}
            <div
                ref={scrollRef}
                className='scroll-container d-flex overflow-auto py-3 no-scrollbar'
            >
                {products.map((item) => (
                    <Card
                    key={item.id}
                    className='item-card border-0 bg-transparent me-4 mx-5'
                    >
                        <Link to={`/product/${item.id}`}>
                        <Card.Img
                            variant='top'
                            src={item.cover_image_url || 'https://vectorified.com/images/disc-icon-3.png'}
                            className='item-cover rounded shadow-sm'
                        >
                        </Card.Img>
                        </Link>
                        <Card.Body className='px-0 pt-2'>
                            <Card.Title
                                className='item-title fw-bold mb-0 text-truncate'
                                title={item.title}
                            >
                            {item.title}
                            </Card.Title>
                            {/* Artists */}
                            <Card.Text className='text-muted small mb-1 text-truncate'>
                                {item.artists && item.artists.length > 0
                                ? item.artists.map(a => a.name).join(', ') : 'Unknown Artists'}
                            </Card.Text>
                            {/* Price */}
                            <Card.Text className='fw-bold text-dark'>
                                    ${Number(item.price || 0).toFixed(2)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            {/* Right scroll button */}
            <Button 
                className='arrow-btn position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-flex align-items-center justify-content-center'
                onClick={() => scroll('right')}
            >
                <i className='bi bi-chevron-right'></i>
            </Button>
        </div>
        </div>
    );
}

export default ProductCarousel;