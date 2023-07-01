import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-dark text-light">
            <div className="container py-5">
                <div className="my-4 mb-5 text-center">
                    <h4 className='mb-4'>Newsletter Subscription</h4>
                    <form className="d-flex flex-column align-items-center justify-content-center gap-4">
                        <input type="email" className="custom-input newsletter-input col-10 col-md-8 col-lg-4" placeholder="Enter your email" />
                        <button type="submit" className="button-primary col-6 col-md-4 col-lg-2 py-2 px-2">Subscribe</button>
                    </form>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <h4 className='mb-4'>Quick Links</h4>
                        <ul className="list-unstyled footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/categories">Categories</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <h4 className='mb-4'>Customer Service</h4>
                        <ul className="list-unstyled footer-links">
                            <li><a href="/faqs">FAQs</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms and Conditions</a></li>
                            <li><a href="/shipping">Shipping Information</a></li>
                            <li><a href="/returns">Returns Policy</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <h4 className='mb-4'>Contact Us</h4>
                        <ul className="list-unstyled">
                            <li>Phone: 123-456-7890</li>
                            <li>Email: info@example.com</li>
                            <li>Address: 123 Street, City, Country</li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <p>&copy; 2023 CodeHaven. All Rights Reserved. Made with
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                            By Nikhil Khutale
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="col-md-6"
                    >
                        <ul className="list-inline float-md-end social-links">
                            <li className="list-inline-item pe-3"><a href="#"><i className="fab fa-facebook fa-2x"></i></a></li>
                            <li className="list-inline-item pe-3"><a href="#"><i className="fab fa-twitter fa-2x"></i></a></li>
                            <li className="list-inline-item pe-3"><a href="#"><i className="fab fa-instagram fa-2x"></i></a></li>
                            <li className="list-inline-item pe-3"><a href="#"><i className="fab fa-linkedin fa-2x"></i></a></li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </footer >
    )
}

export default Footer