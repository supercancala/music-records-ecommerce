import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const PaymentModal = ({ show, handleClose, refreshPayments }) => {
    const [brand, setBrand] = useState('Visa');
    const [cardNumber, setCardNumber] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the FULL number to the backend
            await axios.post('http://127.0.0.1:8000/api/payments', {
                card_brand: brand,
                card_number: cardNumber
            });
            refreshPayments(); 
            handleClose(); 
            setCardNumber(''); 
        } catch (error) {
            console.error("Failed to save card", error);
            alert("Error saving payment method");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Payment Method</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Card Brand</Form.Label>
                        <Form.Select 
                            value={brand} 
                            onChange={e => setBrand(e.target.value)}
                        >
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="Amex">American Express</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            placeholder="XXXX XXXX XXXX XXXX"
                            minLength="16" // Basic validation
                            maxLength="19"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We will only store the last four digits.
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="dark" type="submit">Save Payment Method</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PaymentModal;