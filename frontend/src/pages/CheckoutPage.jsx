import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AddressModal from '../components/AddressModal';
import PaymentModal from '../components/PaymentModal';

const CheckoutPage = () => {
    // Cart data and operations
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [payments, setPayments] = useState([]);

    // State variables for user selection
    const [ selectedAddress, setSelectedAddress ] = useState(null);
    const [ selectedPayment, setSelectedPayment ] = useState(null);
    
    // State for modals and loading
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load addresses and carts
    const fetchData = async () => {
        try {
            const addrRes = await axios.get('http://127.0.0.1:8000/api/addresses');
            const payRes = await axios.get('http://127.0.0.1:8000/api/payments');
            setAddresses(addrRes.data);
            setPayments(payRes.data);
        } catch (err) {
            console.error("Error loading checkout data", err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handlePlaceOrder = async () => {
        if (!selectedAddress || !selectedPayment) {
            setError("Please select both a shipping address and a payment method.");
            return;
        }

        setLoading(true);
        try {
            // Prepare payload for Backend
            const payload = {
                shipping_address_id: selectedAddress,
                payment_method_id: selectedPayment,
                items: cart.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                }))
            };

            // Send to Laravel
            await axios.post('http://127.0.0.1:8000/api/orders', payload);
            
            // On Success: Clear Cart & Redirect to Profile Orders
            clearCart(); 
            navigate('/profile', { state: { activeTab: 'orders' } }); 
            
        } catch (err) {
            console.error(err);
            setError("Failed to place order. Please try again.");
            setLoading(false);
        }
    };

        // If cart is empty, kick them out
        if (cart.length === 0) {
            return (
                <Container className="my-5 text-center">
                    <h2>Your cart is empty</h2>
                    <Button onClick={() => navigate('/shop')} variant="dark" className="mt-3">Go Shopping</Button>
                </Container>
            );
        }
    return (
        <Container className='my-5'>
            <h2 className='fw-bold mb-4'>Checkout</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {/* Left column: Selection of address and payment*/}
                <Col md={8}>
                    {/* Shipping Address Section */}
                    <Card className='mb-4 shadow-sm border-0'>
                        <Card.Header 
                            className="bg-white fw-bold d-flex justify-content-between align-items-center">
                                <span>1. Shipping Address</span>
                                <Button size="sm" variant="outline-primary" onClick={() => setShowAddressModal(true)}>+ Add New</Button>
                            </Card.Header>
                            <Card.Body>
                                {addresses.length === 0 ? <p className="text-muted">No addresses found.</p> : (
                                    <Form>
                                        {addresses.map(addr => (
                                            <div key={addr.id} className="mb-2 p-3 border rounded">
                                                <Form.Check 
                                                    type="radio"
                                                    id={`addr-${addr.id}`}
                                                    label={`${addr.address}, ${addr.city} (${addr.country})`}
                                                    name="addressGroup"
                                                    onChange={() => setSelectedAddress(addr.id)}
                                                />
                                            </div>
                                        ))}
                                    </Form>
                                )}
                            </Card.Body>
                    </Card>
                    {/* Payment method section */}
                    <Card className="mb-4 shadow-sm border-0">
                        <Card.Header className="bg-white fw-bold d-flex justify-content-between align-items-center">
                            <span>2. Payment Method</span>
                            <Button size="sm" variant="outline-primary" onClick={() => setShowPaymentModal(true)}>+ Add New</Button>
                        </Card.Header>
                        <Card.Body>
                            {payments.length === 0 ? <p className="text-muted">No cards found.</p> : (
                                <Form>
                                    {payments.map(pay => (
                                        <div key={pay.id} className="mb-2 p-3 border rounded">
                                            <Form.Check 
                                                type="radio"
                                                id={`pay-${pay.id}`}
                                                label={`${pay.card_brand} ending in ****${pay.last_4_digits}`}
                                                name="paymentGroup"
                                                onChange={() => setSelectedPayment(pay.id)}
                                            />
                                        </div>
                                    ))}
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                {/* Right column: Order summary */}
                <Col md={4}>
                    <Card className="shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
                        <Card.Body>
                            <h5 className="fw-bold mb-3">Order Summary</h5>
                            <ListGroup variant="flush" className="mb-3">
                                {cart.map(item => (
                                    <ListGroup.Item key={item.id} className="d-flex justify-content-between px-0">
                                        <span>{item.quantity}x {item.album_name}</span>
                                        <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            
                            <Button 
                                variant="success" 
                                size="lg" 
                                className="w-100 fw-bold"
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : "Place Order"}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Modals (Hidden) */}
            <AddressModal show={showAddressModal} handleClose={() => setShowAddressModal(false)} refreshAddresses={fetchData} />
            <PaymentModal show={showPaymentModal} handleClose={() => setShowPaymentModal(false)} refreshPayments={fetchData} />

        </Container>
    )
}
export default CheckoutPage;