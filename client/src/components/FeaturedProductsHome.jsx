import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import PreLoader from './PreLoader';
import { axiosInstance } from '../config';

const FeaturedProductsHome = () => {

    const [hovered, isHovered] = useState(null)
    const [featured, setFeatured] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axiosInstance.get('api/featured/getFeatured');
                setFeatured(response.data);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, []);

    const addToWishlist = async (product) => {
        if (currentUser) {
            try {
                setLoading(true)
                const res = await axiosInstance.post("api/wishlist/addWishlist", {
                    user_id: currentUser.id,
                    product_id: product.id
                })
                Swal.fire({
                    title: product.name,
                    text: res.data,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            } finally {
                setLoading(false);
            }
        } else {
            const storedWishlistItems = localStorage.getItem('wishlistItems');
            const wishlistItems = storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
            const wishlistItem = {
                user_id: null,
                ...product
            };
            const updatedWishlist = [...wishlistItems, wishlistItem];
            localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));

            Swal.fire({
                title: product.name,
                text: "added to wishlist!",
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    };


    const sectionTagline = 'Discover Our Featured Products';
    const limitedTimeOffer = 'Limited Time Offer: Free Shipping on All Orders!';

    const handleHover = (id) => {
        isHovered(id)
    }

    const handleFeatured = () => {
        navigate('/shop')
    }

    function calculateOffer(prevPrice, currPrice) {
        var offer = 0;

        if (currPrice < prevPrice) {
            var difference = prevPrice - currPrice;
            offer = Math.floor((difference / prevPrice) * 100); // Round down to the nearest integer
        }

        return offer;
    }


    return (
        <>
            {loading && <PreLoader />}
            <section className="container-fluid">
                <h2 className="text-center mb-4">{sectionTagline}</h2>
                <p className="text-center">{limitedTimeOffer}</p>
                <div className="row">
                    <AnimatePresence>
                        {featured.map((product) => {
                            const images = JSON.parse(product.images)
                            const offerPercentage = calculateOffer(product.prevPrice, product.currPrice);
                            return (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="col-6 col-md-4 col-lg-3"
                                    onClick={() => navigate(`/shop/${product.id}`, { state: product })}
                                >
                                    <div className="featured-product mb-4" onMouseEnter={() => handleHover(product.id)} onMouseLeave={() => handleHover(null)} >
                                        <div className="ribbon">{offerPercentage}%</div>
                                        {hovered === product.id ? (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.5 }}
                                                className="product-CTA"
                                            >
                                                <div className='product-CTA-wishlist rounded-circle mt-1' onClick={() => addToWishlist(product)}><i className="fa-regular fa-heart"></i></div>
                                            </motion.div>
                                        ) : null}
                                        <img src={images[0]} className="featured-product-image" alt={product.name} />
                                        <div className="product-details">
                                            <p className="product-name m-0">{product.name}</p>
                                        </div>
                                        <div>
                                            <span className="prevPrice mx-2">${product.prevPrice}</span>
                                            <span className="currPrice">${product.currPrice}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
                <div className='text-center'>
                    <button className='secondary-button' onClick={handleFeatured}>View All</button>
                </div>
            </section >
        </>
    );
};

export default FeaturedProductsHome;
