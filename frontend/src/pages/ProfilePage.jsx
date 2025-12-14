import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Tab, Nav, Button, Form, Image } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import AddressModal  from "../components/AddressModal";
import PaymentModal from "../components/PaymentModal";
import axios from "axios";


const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const [payments, setPayments] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [orders, setOrders] = useState([]);

    
    const fetchAddresses = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/addresses');
            setAddresses(res.data);
        } catch (error) {
            console.error("Error fetching addresses", error);
        }
    };

    const fetchPayments = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/payments');
            setPayments(res.data);
        } catch (error) {
            console.error("Error fetching payments", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/orders');
            setOrders(res.data);
        } catch (error){
            console.error("Error fetching orders", error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    useEffect(() => {
        fetchAddresses();
        fetchPayments(); // <--- Add this line
    }, []);

    useEffect(() => {
        fetchAddresses();
        fetchPayments();
        fetchOrders(); // <--- Add this!
    }, []);

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Container className="my-5">
            <h2 className="fw-bold mb-4">My Acount</h2>
            <Tab.Container id='profile-tabs' defaultActiveKey={"info"}>
                <Row>
                    <Col md={3} className="mb-4">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <div className="text-center mb-4">
                                    <Image
                                        src={user.profile_picture_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                        roundedCircle
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        className="mb-3"
                                    ></Image>
                                    <h5 className="fw-bold">{user.Fname} {user.Lname}</h5>
                                    <p className="text-muted small">{user.email}</p>
                                </div>

                                <Nav variant="pills" className="flex-column gap-2">
                                    <Nav.Item>
                                        <Nav.Link
                                        eventKey={"info"}
                                        className="text-dark"
                                        >
                                            <i className="bi bi-person-gear me-2"></i> Account Info
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="orders" className="text-dark">
                                            <i className="bi bi-box-seam me-2"></i> Order History
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="addresses" className="text-dark">
                                            <i className="bi bi-geo-alt me-2"></i> Shipping Addresses
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="wallet" className="text-dark">
                                            <i className="bi bi-wallet2 me-2"></i> Wallet
                                        </Nav.Link>
                                    </Nav.Item>
                                    <hr />
                                    <Button 
                                        variant="outline-danger" 
                                        className="w-100" 
                                        onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Right Side (tabs) */}
                    <Col md={9}>
                        <Tab.Content>
                        {/*  Tab 1 */}
                            <Tab.Pane eventKey='info'>
                                <Card className="shadow-sm border-0 p-4">
                                    <h4 className="fw-bold mb-4">Personal Information</h4>
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control 
                                                    type="text"
                                                    defaultValue={user.Fname}
                                                    disabled
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control 
                                                    type="text"
                                                    defaultValue={user.Lname}
                                                    disabled
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                defaultValue={user.email}
                                                disabled
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button onClick={() => alert("Feature Coming soon")}>
                                            Save Changes
                                        </Button>
                                    </Form>
                                </Card>
                            </Tab.Pane>
                            {/* Second Tab: Orders*/}
                            <Tab.Pane eventKey="orders">
                                <Card className="shadow-sm border-0 p-4">
                                    <h4 className="fw-bold mb-4">Order History</h4>

                                    {orders.length === 0 ? (
                                        <div className="text-center py-5">
                                            <i className="bi bi-box-seam display-1 text-muted mb-3"></i>
                                            <h4>No Orders Yet</h4>
                                            <Button variant="primary" onClick={() => navigate('/shop')}>
                                                Start Shopping
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column gap-3">
                                            {orders.map(order => (
                                                <Card key={order.id} className="border p-3">
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <div>
                                                            <strong>Order #{order.id}</strong>
                                                            <span className="text-muted ms-2 small">
                                                                {new Date(order.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        {/* Status Badge Logic */}
                                                        <span className={`badge bg-${
                                                            order.status === 'completed' ? 'success' : 
                                                            order.status === 'shipped' ? 'primary' : 'warning'
                                                        }`}>
                                                            {order.status.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* List Items in the Order */}
                                                    <ul className="list-unstyled mb-0">
                                                        {order.items.map(item => (
                                                            <li key={item.id} className="small text-muted">
                                                                {item.quantity}x Vinyl ID: {item.item_id} (${item.price})
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </Card>
                            </Tab.Pane>
                            {/* Third Tab: Addresses*/}
                            <Tab.Pane eventKey="addresses">
                                <Card className="shadow-sm border-0 p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="fw-bold">Saved Addresses</h4>
                                        <Button 
                                            size="sm" 
                                            onClick={() => setShowAddressModal(true)} // Open Modal
                                        >
                                            + Add New
                                        </Button>
                                    </div>
                                    {addresses.length === 0 ? (
                                        <p className="text-muted">You haven't saved any addresses yet.</p>
                                    ) : (
                                        <div className="list-group">
                                            {addresses.map(addr => (
                                                <div key={addr.id} className="list-group-item border-0 ps-0">
                                                    <strong>{addr.address}</strong><br />
                                                    <small className="text-muted">
                                                        {addr.city}, {addr.postal_code}, {addr.country}
                                                    </small>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Card>
                            </Tab.Pane>

                            {/* Fourth Tab: Payment / Wallet */}
                            <Tab.Pane eventKey='wallet'>
                                <Card className="shadow-sm border-0 p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="fw-bold">Payment Methods</h4>
                                        <Button 
                                            variant="outline-dark" 
                                            size="sm" 
                                            onClick={() => setShowPaymentModal(true)}
                                        >
                                            + Add New
                                        </Button>
                                    </div>
                                    {payments.length === 0 ? (
                                        <p className="text-muted">No cards saved yet.</p>
                                    ) : (
                                        <div className="list-group">
                                            {payments.map(card => (
                                                <div key={card.id} className="list-group-item border-0 ps-0">
                                                    <i className="bi bi-credit-card me-2 text-muted"></i>
                                                    <strong>{card.card_brand}</strong> ending in ****{card.last_4_digits}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Card>
                            </Tab.Pane>

                                    <AddressModal 
                                        show={showAddressModal} 
                                        handleClose={() => setShowAddressModal(false)}
                                        refreshAddresses={fetchAddresses} 
                                    />

                                    <PaymentModal 
                                        show={showPaymentModal} 
                                        handleClose={() => setShowPaymentModal(false)}
                                        refreshPayments={fetchPayments} 
                                    />
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

export default ProfilePage;
