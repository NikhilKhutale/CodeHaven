import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const orderTrackingNumber = location.state

    useEffect(() => {
        if (!orderTrackingNumber) {
            navigate('/')
        }
    }, []);

    return (
        <div className="container vh-50 py-5 my-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card mt-5">
                        <div className="card-body text-center">
                            <h3 className="card-title">Payment Success</h3>
                            <p className="card-text">Your payment was successful.</p>
                            <p className="card-text">Order ID: {orderTrackingNumber?.orderTrackingNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
