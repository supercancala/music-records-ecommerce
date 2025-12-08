import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () =>{
    return (
        <footer className="bg-dark text-white pt-5 pb-3 mt-auto" style={{marginTop: 'auto'}}> 
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                        <h5 className="fw-bold text-uppercase">Mora Limpia Records</h5>
                        <p className="text-white-50 small">
                            The Greatest Record Shop in Nicaragua for limited editions, rare vinyls and high quality audio. 
                        </p>
                    </Col>

                    <Col md={6} className="text-md-end">
                        <h6 className="fw-bold text-uppercase">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a 
                                href="https://github.com/supercancala/music-records-ecommerce.git"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white-50 text-decoration-none hover-white"
                                >
                                    <i className="bi bi-github me-2"></i>GitHub Repo
                                </a>
                            </li>
                            <li className="mb-2">
                                <Link to="/login" className="text-white-50 text-decoration-none hover-white">
                                    <i className="bi bi-shield-lock me-2"></i>Admin Login
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <hr className="border-secondary my-4" />

                <div className="text-center text-white-50 small">
                    &copy; {new Date().getFullYear()} MoraLimpiaRecords. Built for Web Development I.
                </div>
            </Container>
        </footer>
    )
};

export default Footer;