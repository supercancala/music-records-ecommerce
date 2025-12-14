import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
  
        const result = await login(email, password);
        if (result.success) {
            navigate('/shop'); 
        } else {
            setError(result.message);
            setLoading(false);
        }
        
    }


    return (
        <div 
            className="d-flex justify-content-center align-items-center min-vh-100"
        >
            <Container style={{ maxWidth : '400px'}}>
                <Card className="shadow-lg border-0">
                    <Card.Body className="p-4">
                        <h2 className="text-center fw-bold mb-4">Welcome Back</h2>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail"> 
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                    type='email'
                                    placeholder='Enter Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-4' controlId='formBasicPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button
                                type='submit'
                                className='w-100 py-2 fw-bold'
                                disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : "Log In"}
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <span className="text-muted">Don't have an account? </span>
                            <Link to="/register" className="fw-bold text-decoration-none">
                                Sign Up
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default LoginPage;