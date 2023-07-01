import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import PreLoader from './PreLoader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { axiosInstance } from '../config';

const OrderHistory = () => {

    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`api/order/userOrders/${currentUser.id}`);
                setOrder(response.data);
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

    return (
        <>
            {loading && <PreLoader />}
            <div>
                <h2>Order History</h2>
                {order.length === 0 && <div className='text-center mt-4'>No orders yet!</div>}
                {order.map(order => {
                    const address = JSON.parse(order.shipping_address)
                    return (
                        <div key={order.order_id} className="card mb-3">
                            <div className="card-header"
                                data-bs-toggle="collapse"
                                data-bs-target={`#orderCollapse${order.order_id}`}
                            >
                                <h5 className="card-title">Order tracking number: {order.tracking_number}</h5>
                                <p className="card-text">Date: {order.order_date}</p>
                            </div>
                            <div className="collapse card-body" id={`orderCollapse${order.order_id}`}>
                                <h6>Items:</h6>
                                <div>
                                    <ul className="list-group">
                                        {order.order_items.map(item => {
                                            const images = JSON.parse(item.product.images)
                                            return (
                                                <li key={item.order_items_id} className="list-group-item d-flex flex-sm-column flex-md-row gap-2">
                                                    <div className='col-2'>
                                                        <img src={images[0]} alt={item.product.name} className='w-100' />
                                                    </div>
                                                    <div>
                                                        {item.product.name} - <span className='fw-bold'>${item.product.currPrice}</span>
                                                        <p className='mt-3'>Quantity: ${item.quantity}</p>
                                                        <p>Size	: {item.size}</p>
                                                        <p>Color: {item.color}</p>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <h6 className='mt-3'>Shipping address:</h6>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{address.firstName} {address.lastName}</h5>
                                        <p className="card-text">
                                            {address.address1}, {address.address1}, {address.townCity}, {address.province}, {address.postCode}
                                        </p>
                                        <p className="card-text">{address.country}</p>
                                    </div>
                                </div>
                                {order.coupon_code.length > 0 && <p className="mt-3">Coupon: {order.coupon_code}</p>}
                                <p className="mt-3">Total: ${order.total_amount}</p>
                                <p>Status: {order.status}</p>

                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default OrderHistory;
