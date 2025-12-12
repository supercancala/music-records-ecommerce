import React from "react";
import { Container, Table, Button, Image, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <Container className="text-center py-5">
                <div className="mb-4">
                    <i className="bi bi-cart-x display-1 text-muted"></i>
                </div>
                <h2 className="fw-bold mb-3">Your cart is empty!</h2>
                <p className="text-muted mb-4">Looks like you haven't added any vinyls yet</p>
                <Link to='/shop' className="btn btn-primary btn-lg">
                    Start Shopping
                </Link>
            </Container>
        )
    }

    return (
        <Container className="my-5">
            <h1 className="fw-bold mb-4">Shopping Cart</h1>

            <div className="row">
                {/* Left column: Cart items */}
                <div className="col-lg-8">
                    <div className="table-responsive">
                        <Table className="align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th style={{width: '50%'}}>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            {/* Product */}
                                            <div className="d-flex align-items-center">
                                                <Link to='{`/product/${item.id}`}'>
                                                    <Image
                                                        className="me-3"
                                                        src={item.cover_image_url || 'https://vectorified.com/images/disc-icon-3.png'}
                                                        rounded
                                                        style={{width: '80px', height: '80px', objectFit : 'cover'}}
                                                    />
                                                </Link>
                                            </div>
                                            <h6>
                                                <Link to={`/product/${item.id}`} 
                                                className='text-decoration-none text-dark'>
                                                    {item.title}
                                                </Link>
                                            </h6>
                                            <small className="text-muted">
                                                {item.artists?.map(a => a.name).join(', ') || 'Unknown Artists'}
                                            </small>
                                        </td>
                                        {/* Price */}
                                        <td>${Number(item.price).toFixed(2)}</td>

                                        {/* Quantity controls */}
                                        <td>
                                            <div 
                                                className="input-group input-group-sm"
                                                style={{width : '100px'}}
                                            >
                                                <Button
                                                    variant="outline-secondary"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </Button>
                                                <span className="form-control text-center bg-white">{item.quantity}</span>
                                                <Button 
                                                    variant="outline-secondary"
                                                    onClick={() => {updateQuantity(item.id, item.quantity + 1)}}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </td>
                                        {/* Subtotal */}
                                        <td className="fw-bold">
                                            ${(Number(item.price) * item.quantity).toFixed(2)}
                                        </td>

                                        {/* Delete Button */}
                                        <td>
                                            <Button
                                                variant="link"
                                                className="text-danger"
                                                onClick={ () => {removeFromCart(item.id)}}
                                            >
                                                <i className="bi bi-trash fs-5"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                { /* Right Column: Order Summary */}
                <div className="col-lg-4">
                    <Card className="border-0 shadow-sm bg-light">
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-4">
                                <span className="h5 fw-bold">Total</span>
                                <span className="h5 fw-bold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="dark"
                                    size="lg"
                                    onClick={ () => alert('Checkout flow coming soon!')}
                                >
                                    Proceed to Checkout
                                </Button>
                                <Link to="/shop" className="btn btn-outline-dark">
                                    Continue Shopping
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    )
}

export default CartPage;