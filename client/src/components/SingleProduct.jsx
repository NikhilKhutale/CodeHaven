import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PreLoader from './PreLoader';
import { AuthContext } from '../context/authContext';
import { axiosInstance } from '../config';

const SingleProduct = () => {

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [related, setRelated] = useState([])

    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state;

    const images = JSON.parse(product.images)
    const sizes = JSON.parse(product.sizes)
    const details = JSON.parse(product.details);
    const colors = JSON.parse(product.colors)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`api/relatedProducts/${product.category}`);
                setRelated(response.data);
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

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    const handleColorSelection = (color) => {
        setSelectedColor(color);
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
            setQuantity(newQuantity);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = async () => {

        if (currentUser) {
            if (!selectedSize || !selectedColor) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please select both size and color options',
                });
                return
            }

            try {
                setLoading(true)
                const res = await axiosInstance.post("api/cart/addCart", {
                    user_id: currentUser.id,
                    product_id: product.id,
                    quantity: quantity,
                    size: selectedSize,
                    color: selectedColor
                })

                Swal.fire({
                    title: product.name,
                    text: res.data,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    reverseButtons: true
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
            const storedCartItems = localStorage.getItem('cartItems');
            const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
            const cartItem = {
                user_id: null,
                ...product,
                quantity: quantity,
                size: selectedSize,
                color: selectedColor
            };
            const updatedCart = [...cartItems, cartItem];
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));

            Swal.fire({
                title: product.name,
                text: "added to cart!",
                icon: 'success',
                confirmButtonText: 'OK',
                reverseButtons: true
            });
        }
        navigate('/cart', { state: "product" })
    };

    const addToWishlist = async () => {
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

    return (
        <>
            {loading && <PreLoader />}
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-md-6">
                        {/*<!-- Product Images -->*/}
                        <div id="productCarousel" className="carousel slide carousel-fade  position-sticky top-0" data-bs-ride="carousel">
                            {/*<!-- Slides -->*/}
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={images[0]} alt={product.name} className="img-fluid" />
                                </div>
                                <div className="carousel-item">
                                    <img src={images[1]} alt={product.name} className="img-fluid" />
                                </div>
                                {/*<!-- Add more carousel items for additional images -->*/}
                            </div>

                            {/*<!-- Navigation Arrows -->*/}
                            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div className="col-md-6">
                        {/*<!-- Product Details -->*/}
                        <h2>{product.name}</h2>
                        <p className="text-muted">{product.category.replace("-", "->")}</p>

                        <h5 className='mb-3'>Price: ${product.currPrice} <span className='prevPrice'>${product.prevPrice}</span></h5>

                        <h6 className='mb-3'>Quantity:</h6>
                        <div className="quantity-selector ps-4 ps-lg-5">
                            <button className="secondary-button p-2 p-lg-1 border-white" onClick={decrementQuantity}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                </svg>
                            </button>
                            <input
                                className='input-field p-2 mx-2 col-2'
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                            <button className="secondary-button p-2 p-lg-1 border-white" onClick={incrementQuantity}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </button>
                        </div>

                        <h6 className='mb-3 mt-3'>Select Size:</h6>
                        <div className="row justify-content-center">
                            {sizes.map((size) => (
                                <div key={size} className="col-2">
                                    <div className={`size-box ${selectedSize === size ? 'selected' : ''}`} onClick={() => handleSizeSelection(size)}>{size}</div>
                                </div>
                            ))}
                            {/*<!-- Add more size options if needed -->*/}
                        </div>
                        <h6 className='mb-3 mt-3'>Select Color:</h6>
                        <div className="row justify-content-center">
                            {colors.map((color) => (
                                <div key={color} className="col-2">
                                    <div className={`color-box ${selectedColor === color ? 'selected' : ''}`} style={{ backgroundColor: color }} onClick={() => handleColorSelection(color)}></div>
                                </div>
                            ))}
                        </div>

                        <div className="mb-3 mt-3 d-flex justify-content-center gap-3">
                            {selectedSize.length === 0 ?
                                <button className="col-6 button-primary">Select size</button> :
                                selectedColor.length === 0 ?
                                    <button className="col-6 button-primary">Select color</button> :
                                    <button className="col-6 button-primary" onClick={addToCart}>Add to Cart</button>
                            }
                            <button className="col-6 secondary-button" onClick={addToWishlist}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>
                            </button>
                        </div>

                        <h6 className='mb-3 mt-3'>Product Details:</h6>
                        <ul>
                            {Object.entries(details).map(([key, value]) => (
                                <li key={key} className='mb-2'>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>

                        <h6 className='mb-3 mt-3'>Description:</h6>
                        <p>{product.desc}</p>

                        {/* <!-- Related Products -->*/}
                        <h6 className='mb-3 mt-3'>Related Products:</h6>
                        <div className="row">
                            {related.map((product) => {
                                const images = JSON.parse(product.images)
                                return (
                                    <div key={product.id} className="col-6 col-md-4 mb-3">
                                        <div className="featured-product">
                                            <img src={images[0]} alt={product.name} className="card-img-top" />
                                            <div className="card-body">
                                                <p className='mb-0'>{product.name}</p>
                                            </div>
                                            <div>
                                                <span className="prevPrice mx-2">${product.prevPrice}</span>
                                                <span className="currPrice">${product.currPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct