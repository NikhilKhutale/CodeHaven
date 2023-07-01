import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PreLoader from './PreLoader';
import { axiosInstance } from '../config';

const Billing = () => {

    const initialState = {
        firstName: '',
        lastName: '',
        country: '',
        address1: '',
        address2: '',
        townCity: '',
        province: '',
        postCode: '',
        phone: '',
        email: ''
    };

    const initialChecks = {
        termsAndConditions: true,
        createAccount: false,
        newsletterSubscription: false
    };

    const initialPaymentOption = {
        paymentOption: 'credit-card'
    };

    const location = useLocation();
    const navigate = useNavigate()
    const order_details = location.state;

    useEffect(() => {
        if (!order_details) {
            navigate('/cart')
        }
    }, []);

    const [addData, setAddData] = useState(initialState);
    const [checkData, setCheckData] = useState(initialChecks);
    const [paymentOption, setPaymentOption] = useState(initialPaymentOption);
    const [inputErrors, setInputErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAddData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setCheckData((prevData) => ({
            ...prevData,
            [id]: checked
        }));
    };

    const handlePaymentOptionChange = (e) => {
        setPaymentOption((prevData) => ({
            ...prevData,
            paymentOption: e.target.id
        }));
    };

    const handlePlaceOrder = async () => {
        if (!checkData.termsAndConditions) {
            return
        }

        let hasEmptyField = false;
        const inputErrors = {};

        Object.entries(addData).forEach(([key, value]) => {
            if (value.trim() === '') {
                hasEmptyField = true;
                inputErrors[key] = true;
            }
        });

        setInputErrors(inputErrors);

        if (hasEmptyField) {
            return
        }

        try {
            setLoading(true)
            const res = await axiosInstance.post('api/order/placeOrder', {
                ...order_details,
                user_id: order_details.cart[0].user_id,
                addData: addData,
                checkData: checkData,
                paymentOption: paymentOption
            })
            navigate("/payment/success", {state : {orderTrackingNumber : res.data.orderTrackingNumber}})
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <PreLoader />}
            <div className="container my-5 py-5 py-2">
                <h1 className='pb-3'>Billing Details Form</h1>
                <div className="row">
                    <div className="col-lg-6">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input type="text" className={`form-control input-field ${inputErrors.firstName ? 'error-border' : ''}`} id="firstName" required value={addData.firstName} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input type="text" className={`form-control input-field ${inputErrors.lastName ? 'error-border' : ''}`} id="lastName" required value={addData.lastName} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input type="text" className={`form-control input-field ${inputErrors.country ? 'error-border' : ''}`} id="country" required value={addData.country} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address1" className="form-label">Address Line 1</label>
                                <input type="text" className={`form-control input-field ${inputErrors.address1 ? 'error-border' : ''}`} id="address1" required value={addData.address1} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address2" className="form-label">Address Line 2</label>
                                <input type="text" className="form-control input-field" id="address2" value={addData.address2} onChange={handleInputChange} />
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="townCity" className="form-label">Town/City</label>
                                        <input type="text" className={`form-control input-field ${inputErrors.townCity ? 'error-border' : ''}`} id="townCity" required value={addData.townCity} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="province" className="form-label">Province</label>
                                        <input type="text" className={`form-control input-field ${inputErrors.province ? 'error-border' : ''}`} id="province" required value={addData.province} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postCode" className="form-label">Post Code</label>
                                <input type="text" className={`form-control input-field ${inputErrors.postCode ? 'error-border' : ''}`} id="postCode" required value={addData.postCode} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="tel" className={`form-control input-field ${inputErrors.phone ? 'error-border' : ''}`} id="phone" required value={addData.phone} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" className={`form-control input-field ${inputErrors.email ? 'error-border' : ''}`} id="email" required value={addData.email} onChange={handleInputChange} />
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 border p-lg-5">
                        <div className="d-flex flex-column gap-3 justify-content-center py-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="termsAndConditions" checked={checkData.termsAndConditions} onChange={handleCheckboxChange} />
                                <label className="form-check-label" style={{ color: !checkData.termsAndConditions ? "red" : "" }} htmlFor="termsAndConditions">
                                    TERMS AND CONDITIONS
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="createAccount" checked={checkData.createAccount} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="createAccount">
                                    CREATE AN ACCOUNT
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="newsletterSubscription" checked={checkData.newsletterSubscription} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="newsletterSubscription">
                                    SUBSCRIBE TO OUR NEWSLETTER
                                </label>
                            </div>
                        </div>
                        <h5 className="card-title py-3">Cart Total</h5>
                        <table className="table table-borderless px-1">
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td className='text-end'>${order_details?.subtotal}</td>
                                </tr>
                                <tr>
                                    <td>Discount</td>
                                    <td className='text-end'>${order_details?.discount}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td className='text-end'>{order_details?.shippingMethod === 'pickup' ? 'Free' : order_details?.shippingMethod === 'nextDay' ? '$4.99' : '$1.99'}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td className='text-end'>${order_details?.cartTotal}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h5 className="card-title py-4">Payment Options</h5>
                        <div className="d-flex flex-column gap-3 justify-content-center pb-5">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="payment-option" id="COD" checked={paymentOption.paymentOption === 'COD'} onChange={handlePaymentOptionChange} />
                                <label className="form-check-label" htmlFor="COD">
                                    Cash on delivery
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="payment-option" id="credit-card" checked={paymentOption.paymentOption === 'credit-card'} onChange={handlePaymentOptionChange} />
                                <label className="form-check-label" htmlFor="credit-card">
                                    Credit Card
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="payment-option" id="paypal" checked={paymentOption.paymentOption === 'paypal'} onChange={handlePaymentOptionChange} />
                                <label className="form-check-label" htmlFor="paypal">
                                    PayPal
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="payment-option" id="google-pay" checked={paymentOption.paymentOption === 'google-pay'} onChange={handlePaymentOptionChange} />
                                <label className="form-check-label" htmlFor="google-pay">
                                    Google Pay
                                </label>
                            </div>
                        </div>

                        <button className="button-primary w-100" type="button" onClick={handlePlaceOrder}>Place Order</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Billing