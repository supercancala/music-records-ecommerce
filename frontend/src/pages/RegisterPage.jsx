import React, {useState} from "react";
import { Container, Card, Form, Button, Alert, Spinner, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
  
        const result = await register(firstName, lastName, email, password, confirmPassword);
        
        if (result.success) {
            navigate('/shop'); // Redirect to Shop on success
        } else {
            setError(result.message);
            setLoading(false);
        }
    }

    return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Container style={{maxWidth : '500px'}}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-5">
                            <h2 className="text-center fw-bold mb-4">Create Account</h2>
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="formFirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="John"
                                                required
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formLastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Doe"
                                                required
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </Form.Control> 
                                </Form.Group>
                                <FormGroup className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password" 
                                        placeholder="At-least 8 characters"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>
                                <FormGroup className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password" 
                                        placeholder="Re-type password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    ></Form.Control>
                                </FormGroup>

                                <Button
                                    type="submit"
                                    className="w-100 py-2 fw-bold"
                                    variant="dark"
                                    disabled={loading}
                                >
                                    {loading ? <Spinner animation="border" size="sm"/> : "Sign Up"}
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <span className="text-muted">Already have an account? </span>
                                <Link to="/login" className="fw-bold text-decoration-none">
                                    Log In
                                </Link>
                             </div>  
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
}

export default RegisterPage;