import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tab, Nav, Button, Image, Badge, Table, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddItemModal from "../components/AddItem.Modal";
import axios from 'axios';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    // Admin guard
    useEffect(() => {
        if (!user || user.is_admin !== 1) { 
            // Note: Check your DB, sometimes boolean is returned as 1 or true
            navigate('/'); 
        }
        fetchAdminData();
    }, [user, navigate]);

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/admin/orders');
            setOrders(res.data);
        } catch (error) {
            console.error("Access Denied", error);
        }
        setLoading(false);
    };

    const fetchProducts = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/api/items?sort=newest');
        setProducts(res.data);
    } catch (error) {
        console.error("Error fetching products", error);
    }
};

    const fetchAdminOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/admin/orders');
            setOrders(res.data);
        } catch (error) {
            console.error("Access Denied", error);
        }
        setLoading(false);
    };

    

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/admin/orders/${orderId}/status`, {
                status: newStatus
            });
            await fetchAdminOrders(); // Refresh list
        } catch (error) {
            console.error("Status Update Failed:", error.response?.data || error.message);
            alert("Failed to update status. Check console for details.");
        }
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    useEffect(() => {
        if (user && user.is_admin) {
            fetchAdminOrders();
            fetchProducts(); // <--- Fetch inventory too
        }
    }, [user, navigate]);

    if (!user) return null; // Prevent flash of content

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Admin Dashboard</h2>
                <Badge bg="danger" className="fs-6">ADMIN MODE</Badge>
            </div>

            <Tab.Container id="admin-tabs" defaultActiveKey="orders">
                <Row>
                    {/* Left Sidebar */}
                    <Col md={3} className="mb-4">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <div className="text-center mb-4">
                                    <Image 
                                        src={user.profile_picture_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                        roundedCircle 
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        className="mb-3"
                                    />
                                    <h5 className="fw-bold">{user.Fname} {user.Lname}</h5>
                                    <p className="text-muted small">Store Administrator</p>
                                </div>

                                <Nav variant="pills" className="flex-column gap-2">
                                    <Nav.Item>
                                        <Nav.Link eventKey="orders" className="text-dark">
                                            <i className="bi bi-clipboard-data me-2"></i> Manage Orders
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="products" className="text-dark">
                                            <i className="bi bi-disc me-2"></i> Inventory / Vinyls
                                        </Nav.Link>
                                    </Nav.Item>
                                    <hr />
                                    <Button variant="outline-danger" className="w-100" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* RIGHT CONTENT */}
                    <Col md={9}>
                        <Tab.Content>
                            
                            {/* TAB 1: MANAGE ORDERS */}
                            <Tab.Pane eventKey="orders">
                                <Card className="shadow-sm border-0 p-4">
                                    <h4 className="fw-bold mb-4">All Customer Orders</h4>
                                    {orders.length === 0 ? (
                                        <p className="text-muted">No orders found.</p>
                                    ) : (
                                        <Table hover responsive>
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>#ID</th>
                                                    <th>Customer</th>
                                                    <th>Date</th>
                                                    <th>Items</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map(order => (
                                                    <tr key={order.id} className="align-middle">
                                                        <td>{order.id}</td>
                                                        <td>
                                                            {order.user ? `${order.user.Fname} ${order.user.Lname}` : 'Guest'}
                                                            <div className="small text-muted">{order.user?.email}</div>
                                                        </td>
                                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                                        <td>
                                                            <span className="badge bg-secondary">{order.items.length} Items</span>
                                                        </td>
                                                        <td>
                                                            <span className={`badge bg-${
                                                                order.status === 'completed' ? 'success' : 
                                                                order.status === 'shipped' ? 'primary' : 
                                                                order.status === 'pending' ? 'warning' : 'secondary'
                                                            }`}>
                                                                {order.status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {/* STATUS DROPDOWN */}
                                                            <Form.Select 
                                                                size="sm" 
                                                                value={order.status}
                                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                                style={{ width: '130px' }}
                                                            >
                                                                <option value="pending">Pending</option>
                                                                <option value="shipped">Shipped</option>
                                                                <option value="completed">Completed</option>
                                                                <option value="cancelled">Cancelled</option>
                                                            </Form.Select>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                    
                                </Card>
                            </Tab.Pane>

                            {/* TAB 2: INVENTORY */}
                            <Tab.Pane eventKey="products">
                                <Card className="shadow-sm border-0 p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="fw-bold">Product Inventory</h4>
                                        <Button variant="dark" size="sm" onClick={() => setShowAddModal(true)}>
                                            + Add New Vinyl
                                        </Button>
                                    </div>
                                    
                                    {/* Simple Product Table */}
                                    <Table hover responsive size="sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Stock</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(p => (
                                                <tr key={p.id}>
                                                    <td>{p.id}</td>
                                                    <td>
                                                        <img src={p.cover_image} alt="" style={{width:'40px', height:'40px', objectFit:'cover'}} />
                                                    </td>
                                                    <td>{p.title}</td>
                                                    <td>{p.stock_quantity}</td>
                                                    <td>${p.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </Tab.Pane>


                            <AddItemModal 
                                show={showAddModal} 
                                handleClose={() => setShowAddModal(false)}
                                refreshInventory={fetchProducts} 
                            />
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default AdminDashboard;