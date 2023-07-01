import React, { useContext, useEffect, useState } from 'react'
import Logo from '../assets/Logo(6).png'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Swal from 'sweetalert2';
import { axiosInstance } from '../config';

const tabs = ["home", "shop", "about", "blog"]

const Product = ({ product }) => {
    const images = JSON.parse(product.images)

    return (
        <div className='container mb-3'>
            <div className="row justify-content-center">
                <div className='col-3'>
                    <img className='w-100' src={images[0]} alt="" />
                </div>
                <div className='col-7'>{product.name}</div>
            </div>
        </div>
    )
}

const Navbar = () => {
    const [isBtnActive, setIsBtnActive] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([])
    const [wishlist, setWishlist] = useState([])
    const { currentUser } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState('');


    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (currentUser) {
                    const [cartResponse, wishlistResponse] = await Promise.all([
                        axiosInstance.get(`api/cart/${currentUser.id}`),
                        axiosInstance.get(`api/wishlist/${currentUser.id}`)
                    ]);

                    setCart(cartResponse.data);
                    setWishlist(wishlistResponse.data);
                } else {
                    const storedCartItems = localStorage.getItem('cartItems');
                    const storedWishlistItems = localStorage.getItem('wishlistItems');
                    const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
                    const wishlistItems = storedWishlistItems ? JSON.parse(storedWishlistItems) : [];

                    setCart(cartItems);
                    setWishlist(wishlistItems);
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser, location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight * 0.9; // 90vh

            setIsSticky(scrollPosition >= viewportHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleExplore = (event) => {
        event.preventDefault();
        navigate(`/shop?search=${encodeURIComponent(inputValue)}`);
    };

    const handleClick = () => {
        setIsBtnActive(!isBtnActive);
    };

    const handleNavigate = (tab) => {
        navigate(tab === 'home' ? '/' : `/${tab}`)
    }

    const handleUser = () => {
        navigate(currentUser ? "/userAccount" : "auth")
    }
    return (
        <>
            <div className="d-flex justify-content-between bg-dark text-white">
                <div className='col-8 d-flex align-items-center'>
                    <div id="offerCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="carousel-content">
                                    <p className='m-0'>Get 50% off on selected items!🎉</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="carousel-content">
                                    <p className='m-0'>Buy one, get one free!👚+👚</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="carousel-content">
                                    <p className='m-0'>Limited-Time Discount!🧨</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-4 col-md-2 d-flex align-items-center'>
                    <select className="form-select custom-select">
                        <option value="us">US</option>
                        <option value="uk">UK</option>
                        <option value="ca">CA</option>
                        <option value="ca">IN</option>
                        {/* Add more country options */}
                    </select>
                    <select className="form-select custom-select">
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                        <option value="es">SP</option>
                        {/* Add more language options */}
                    </select>
                </div>
            </div>
            <div className={`${isSticky ? 'sticky-top' : 'position-absolute'} top-10 start-0 w-100`}>
                <nav className={`navbar navbar-expand-lg sticky-top ${isSticky ? 'bg-light' : location.pathname === '/' ? 'bg-transparent' : "bg-light"}`}>
                    <div className="container-fluid">
                        <button className={`navbar-toggler ${isBtnActive ? 'active' : ''}`} onClick={handleClick} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className={`line ${isSticky ? 'bg-dark' : location.pathname === '/' ? 'bg-light' : "bg-dark"}`}></span>
                            <span className={`line ${isSticky ? 'bg-dark' : location.pathname === '/' ? 'bg-light' : "bg-dark"}`}></span>
                            <span className={`line ${isSticky ? 'bg-dark' : location.pathname === '/' ? 'bg-light' : "bg-dark"}`}></span>
                        </button>
                        <a className={`navbar-brand d-flex align-items-center gap-1 custom-brand ${isSticky ? '' : location.pathname === '/' ? 'text-white' : "black"}`} onClick={() => handleNavigate("home")}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138597468Logo(6).png?alt=media&token=ee968190-f5a2-4126-af01-ca1697874b70" alt="codeHaven" style={{ height: "20px" }} />
                            CodeHaven
                        </a>
                        <div className='d-block d-lg-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={`${isSticky ? 'black' : location.pathname === '/' ? 'white' : "black"}`} className="bi bi-search mx-1" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#searchModal">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                            <span className="position-relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={`${isSticky ? 'black' : location.pathname === '/' ? 'white' : "black"}`} className="bi bi-bag-check mx-1" viewBox="0 0 16 16" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">
                                    <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                </svg>
                                {cart.length > 0 &&
                                    <span className="position-absolute top-25 start-75 translate-middle p-1 bg-danger border border-light rounded-circle">
                                        <span className="visually-hidden">New alerts</span>
                                    </span>
                                }
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={`${isSticky ? 'black' : location.pathname === '/' ? 'white' : "black"}`} className="bi bi-person mx-1" viewBox="0 0 16 16" onClick={handleUser}>
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            <span className="position-relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={`${isSticky ? 'black' : location.pathname === '/' ? 'white' : "black"}`} className="bi bi-heart mx-1" viewBox="0 0 16 16" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>
                                {wishlist.length > 0 &&
                                    <span className="position-absolute top-25 start-75 translate-middle p-1 bg-danger border border-light rounded-circle">
                                        <span className="visually-hidden">New alerts</span>
                                    </span>
                                }
                            </span>
                        </div>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav mx-auto" style={{ '--bs-nav-link-color': isSticky ? '' : location.pathname === '/' ? 'white' : "black" }}>
                                {tabs.map((tab) => (
                                    <li key={tab} className="nav-item mx-2">
                                        <a className="nav-link custom-size" onClick={() => handleNavigate(tab)}>{tab}</a>
                                    </li>
                                ))}
                            </ul>

                            <ul className="navbar-nav d-none d-lg-flex" style={{ '--bs-nav-link-color': isSticky ? '' : location.pathname === '/' ? 'white' : "black" }}>
                                <li className="nav-item">
                                    <a className="nav-link custom-hover mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search mx-1" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#searchModal">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link custom-hover mx-2 position-relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-check" viewBox="0 0 16 16" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">
                                            <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg>
                                        {cart.length > 0 &&
                                            <span className="position-absolute top-25 start-75 translate-middle p-1 bg-danger border border-light rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                        }
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link custom-hover mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16" onClick={handleUser}>
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                        </svg>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link custom-hover mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                        </svg>
                                        {wishlist.length > 0 &&
                                            <span className="position-absolute top-25 start-75 translate-middle p-1 bg-danger border border-light rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                        }
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div
                className="modal fade"
                id="searchModal"
                tabIndex="-1"
                aria-labelledby="searchModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-4">
                                <input type="text" className="form-control input-field" placeholder="Find your perfect item..." value={inputValue} onChange={handleInputChange} />
                                <button className="button-primary" type="button" onClick={handleExplore}>Explore</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasSidebar"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Shopping Bag</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav nav-pills mb-3" id="sidebarTabs" role="tablist">
                        <li className="nav-item w-50" role="presentation">
                            <button className="nav-link btn-color active w-100" id="cart-tab" data-bs-toggle="pill" data-bs-target="#cart" type="button" role="tab" aria-controls="cart" aria-selected="true">
                                Cart
                            </button>
                        </li>
                        <li className="nav-item w-50" role="presentation">
                            <button className="nav-link btn-color w-100" id="wishlist-tab" data-bs-toggle="pill" data-bs-target="#wishlist" type="button" role="tab" aria-controls="wishlist" aria-selected="false">
                                Wishlist
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="sidebarTabContent">
                        <div className="tab-pane fade show active" id="cart" role="tabpanel" aria-labelledby="cart-tab">
                            {(!cart || cart.length === 0) ? (
                                <p className='text-center mt-4'>Your cart is empty!</p>
                            ) : (
                                <>
                                    {cart.map((item, index) => (
                                        <Product key={index} product={item} />
                                    ))}
                                    <div className='w-100 text-center'>
                                        <button className='secondary-button' onClick={() => navigate('/cart')} data-bs-dismiss="offcanvas">See All</button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="tab-pane fade" id="wishlist" role="tabpanel" aria-labelledby="wishlist-tab">
                            {(!wishlist || wishlist.length === 0) ? (
                                <p className='text-center mt-4'>Wishlist is empty</p>
                            ) : (
                                wishlist.map((item, index) => (
                                    <Product key={index} product={item} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar