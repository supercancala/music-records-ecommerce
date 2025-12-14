import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

const AddItemModal = ({ show, handleClose, refreshInventory }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock_quantity: '',
        release_date: '',
        cover_art_url: '',
        artists: '', 
        genres: ''  
    });

    const [loading, setLoading] = useState(false);

    // 2. Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://127.0.0.1:8000/api/admin/items', formData);
            refreshInventory(); 
            handleClose();      
            // Reset Form
            setFormData({
                title: '', description: '', price: '', stock_quantity: '',
                release_date: '', cover_art_url: '', artists: '', genres: ''
            });
        } catch (error) {
            alert("Failed to create vinyl. Check console.");
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add New Vinyl</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Album Title</Form.Label>
                                <Form.Control 
                                    required type="text" placeholder="e.g. Abbey Road"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Release Date</Form.Label>
                                <Form.Control 
                                    required type="date"
                                    value={formData.release_date}
                                    onChange={e => setFormData({...formData, release_date: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Price ($)</Form.Label>
                                <Form.Control 
                                    required type="number" step="0.01"
                                    value={formData.price}
                                    onChange={e => setFormData({...formData, price: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Stock Quantity</Form.Label>
                                <Form.Control 
                                    required type="number"
                                    value={formData.stock_quantity}
                                    onChange={e => setFormData({...formData, stock_quantity: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Cover Image URL</Form.Label>
                        <Form.Control 
                            type="text" placeholder="https://..."
                            value={formData.cover_image}
                            onChange={e => setFormData({...formData, cover_image: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" rows={3}
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </Form.Group>

                    {/* NEW SIMPLE INPUTS */}
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Artists (Comma separated)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="e.g. The Beatles, Queen"
                                    value={formData.artists}
                                    onChange={e => setFormData({...formData, artists: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Genres (Comma separated)</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="e.g. Rock, Pop, Classic"
                                    value={formData.genres}
                                    onChange={e => setFormData({...formData, genres: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="dark" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Save Vinyl"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddItemModal;