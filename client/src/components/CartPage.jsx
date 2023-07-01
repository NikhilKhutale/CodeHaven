import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Swal from 'sweetalert2'
import axios from 'axios'
import PreLoader from './PreLoader'
import { axiosInstance } from '../config'

const CartPage = () => {

    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([])
    const [subtotal, setSubtotal] = useState(0);
    const [coupon, setCoupon] = useState(0);
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [cartTotal, setCartTotal] = useState(0);
    const [couponCode, setCouponCode] = useState('');

    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (currentUser) {
                    const [cartResponse, wishlistResponse] = await Promise.all([
                        axiosInstance.get(`api/cart/${currentUser.id}`),
                    ]);

                    setCart(cartResponse.data);
                } else {
                    const storedCartItems = localStorage.getItem('cartItems');
                    const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

                    setCart(cartItems);
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
    }, [currentUser]);

    const navigate = useNavigate();
    const location = useLocation();
    const cameFrom = location.state;

    const handleContinueShopping = () => {
        navigate(cameFrom === "product" ? -1 : '/')
    }

    const calculateSubtotal = () => {
        let total = 0;
        cart.forEach((product) => {
            total += product.currPrice * product.quantity;
        });
        return total;
    };

    const calculateCartTotal = () => {
        const total = subtotal - (subtotal * coupon) / 100;
        if (shippingMethod === 'nextDay') {
            return total + 4.99;
        } else if (shippingMethod === 'standard') {
            return total + 1.99;
        } else {
            return total;
        }
    };

    useEffect(() => {
        const newSubtotal = calculateSubtotal();
        setSubtotal(newSubtotal);

        const newCartTotal = calculateCartTotal();
        setCartTotal(newCartTotal);
    }, [cart, coupon, shippingMethod]);

    const handleCouponCode = (e) => {
        setCouponCode(e.target.value)
    }

    const handleApplyCoupon = async () => {
        try {
            setLoading(true)
            const couponData = await axiosInstance.get(`api/coupons/singleCoupon?code=${couponCode}`);
            if (!couponData.data) {
                Swal.fire({
                    icon: "error",
                    text: "Coupon not valid",
                });
                return;
            }
            const couponPercentage = couponData.data.percentage; 
            setCoupon(couponPercentage);
            Swal.fire({
                icon: "success",
                text: "Coupon applied successfully",
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(false)
        }
    };

    const handleShippingMethodChange = (event) => {
        setShippingMethod(event.target.value);
    };

    const handleRemoveItem = (id, quantity, color, size) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    if (currentUser) {
                        const res = await axiosInstance.delete('api/cart/removeCart', {
                            data: {
                                user_id: currentUser.id,
                                product_id: id,
                                quantity: quantity,
                                color: color,
                                size: size
                            }
                        });
                        setCart((cartItems) => cartItems.filter((item) => item.id !== id));
                        Swal.fire('Deleted!', res.data, 'success');
                    } else {
                        const storedCartItems = localStorage.getItem('cartItems');
                        const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
                        const updatedCart = cartItems.filter((item) => {
                            return (
                                item.id !== id ||
                                item.quantity !== quantity ||
                                item.color !== color ||
                                item.size !== size
                            );
                        });
                        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                        setCart(updatedCart);
                        Swal.fire('Deleted!', 'Item removed from cart.', 'success');
                    }
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
        });
    };

    
    const handleProceedCheckout = () => {
        navigate('/billing', {state : {cart : cart, subtotal: subtotal.toFixed(2), discount : ((subtotal * coupon) / 100).toFixed(2), coupon: coupon !== 0 ? couponCode : "" , shippingMethod : shippingMethod, cartTotal : calculateCartTotal().toFixed(2)}})
    }

    return (
        <>
            {loading && <PreLoader />}
            <div className='container'>
                <h1 className='mt-5 py-4'>Cart</h1>
                <table className="table  table-borderless">
                    <thead >
                        <tr className="header-row">
                            <th scope="col"></th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product, index) => {
                            const images = JSON.parse(product.images)
                            return (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td className='align-middle'>
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleRemoveItem(product.id, product.quantity, product.color, product.size)} width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </td>
                                    <td className='align-middle'>
                                        <img src={images[0]} alt={product.name} style={{ width: '100px' }} />
                                        <span className='d-flex flex-column'>
                                            <span>{product.name}</span>
                                            <span>Color : {product.color}</span>
                                            <span>Size : {product.size}</span>
                                        </span>
                                    </td>
                                    <td className='align-middle'>${product.currPrice}</td>
                                    <td className='align-middle text-center'>{product.quantity}</td>
                                    <td className='align-middle'>${product.currPrice * product.quantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {cart.length === 0 && <p className='text-center my-5'>Your cart is empty!</p>}
                <div className='d-flex justify-content-between'>
                    <button className='secondary-button' onClick={handleContinueShopping}>CONTINUE SHOOPING</button>
                    <button className='secondary-button'>CLEAR CART</button>
                </div>
                <div className="row py-5 py-2 px-lg-3">
                    <div className="col-lg-4">
                        <h5 className="card-title mb-3">CUPON CODE</h5>
                        <div className="input-group mb-4">
                            <input type="text" id="couponCode" name="coupon_code" className="form-control input-field" placeholder="Enter your cupone code" value={couponCode} onChange={handleCouponCode} />
                            <button className="button-primary" type="button" onClick={handleApplyCoupon}>APPLY</button>
                        </div>
                    </div>
                    <div className="col-lg-4 px-lg-3">
                        <h5 className="card-title mb-3">SHIPPING METHOD</h5>
                        <div className="form-check d-flex justify-content-between mb-4 mt-4">
                            <div>
                                <input className="form-check-input" type="radio" name="shippingMethod" id="nextDayDelivery" value="nextDay" checked={shippingMethod === 'nextDay'} onChange={handleShippingMethodChange} />
                                <label className="form-check-label" htmlFor="nextDayDelivery">
                                    Next day delivery
                                </label>
                            </div>
                            <span className="badge bg-primary ms-auto">$4.99</span>
                        </div>
                        <div className="form-check d-flex justify-content-between mb-4">
                            <div>
                                <input className="form-check-input" type="radio" name="shippingMethod" id="standardDelivery" value="standard" checked={shippingMethod === 'standard'} onChange={handleShippingMethodChange} />
                                <label className="form-check-label" htmlFor="standardDelivery">
                                    Standard delivery
                                </label>
                            </div>
                            <span className="badge bg-primary ms-auto">$1.99</span>
                        </div>
                        <div className="form-check d-flex justify-content-between mb-4">
                            <div>
                                <input className="form-check-input" type="radio" name="shippingMethod" id="personalPickup" value="pickup" checked={shippingMethod === 'pickup'} onChange={handleShippingMethodChange} />
                                <label className="form-check-label" htmlFor="personalPickup">
                                    Personal Pickup
                                </label>
                            </div>
                            <span className="badge bg-success ms-auto">Free</span>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h5 className="card-title mb-3">CART TOTAL</h5>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td className='text-end'>${subtotal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Discount</td>
                                    <td className='text-end'>${((subtotal * coupon) / 100).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td className='text-end'>{shippingMethod === 'pickup' ? 'Free' : shippingMethod === 'nextDay' ? '$4.99' : '$1.99'}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td className='text-end'>${calculateCartTotal().toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        { cart.length > 0 && <button className="button-primary w-100" type="button" onClick={handleProceedCheckout}>PROCEED TO CHECKOUT</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage