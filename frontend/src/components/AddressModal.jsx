import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";

const AddressModal = ({show, handleClose, refreshAddresses }) => {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postal_code: '',
        country: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/addresses', formData);
            refreshAddresses(); // Tells parent to reload list
            handleClose(); // Close modal
            setFormData({ address: '', city: '', postal_code: '', country: '' }); // Reset form
        } catch (error) {
            console.error("Failed to save address", error);
            alert("Error saving address");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Address</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            placeholder="De donde fue el chamán..."
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                        />
                    </Form.Group>
                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control 
                                    required type="text" 
                                    value={formData.city}
                                    onChange={e => setFormData({...formData, city: e.target.value})}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control 
                                    required type="text" 
                                    value={formData.postal_code}
                                    onChange={e => setFormData({...formData, postal_code: e.target.value})}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control 
                            required type="text" 
                            value={formData.country}
                            onChange={e => setFormData({...formData, country: e.target.value})}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="dark" type="submit">Save Address</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddressModal;
