import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';
import { AuthContext } from '../context/authContext';
import PreLoader from './PreLoader';
import { axiosInstance } from '../config';



const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false)

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate()

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get('api/order/adminOrders')
      setOrders(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  // Function to cancel an order
  const cancelOrder = (orderId) => {
    toast.success(`Order ${orderId} cancelled successfully`);
  };

  const filteredOrders = orders.filter((order) =>
    order.tracking_number.includes(searchTerm) ||
    ('user' in order && Object.keys(order.user).length > 0 &&
      order.user.fname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Function to export orders as CSV
  const exportOrdersAsCSV = () => {
    setLoading(true)
    const csvData = orders.map((order) => ({
      OrderID: order.order_id,
      UserID: order.user_id,
      OrderDate: order.order_date,
      TotalAmount: order.total_amount,
      Status: order.status,
      PaymentMethod: order.payment_method,
      ShippingAddress: JSON.stringify(order.shipping_address),
      ShippingMethod: order.shipping_method,
      TrackingNumber: order.tracking_number,
      CouponCode: order.coupon_code,
    }));

    const csvString = Papa.unparse(csvData);

    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([csvString], { type: 'text/csv;charset=utf-8' }));
    anchor.download = 'orders.csv';

    anchor.click();

    URL.revokeObjectURL(anchor.href);
    setLoading(false)
  };

  const handleNewOrderNotification = (order) => {
    toast.info(`New order received: ${order.orderNumber}`);
  };

  // Simulating new order notification
  const simulateNewOrderNotification = () => {
    const newOrder = {
      orderNumber: 'ABC123',
    };

    handleNewOrderNotification(newOrder);
  };

  useEffect(() => {

    if (currentUser.role !== "admin") {
      navigate('/')
    } else {
      fetchOrders()
    }

    const timer = setTimeout(simulateNewOrderNotification, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <PreLoader />}
      <div className="container">
        <h2>Orders</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control input-field"
            placeholder="Search by order number or customer name"
            id='Order_no'
            name='Order_no'
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className="w-100 overflow-x-auto">
          <table className="table table-hover table-responsive">
            <thead>
              <tr className='header-row'>
                <th>Order Number</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const hasUserKeyWithValue = 'user' in order && Object.keys(order.user).length > 0;
                const address = JSON.parse(order.shipping_address);
                return (
                  <React.Fragment key={order.order_id}>
                    <tr data-bs-toggle="collapse" data-bs-target={`#orderCollapse${order.order_id}`} aria-expanded="false" aria-controls={`orderCollapse${order.order_id}`}>
                      <td>{order.tracking_number}</td>
                      <td>{hasUserKeyWithValue ? order.user.fname : "Guest"}</td>
                      <td>{order.order_date}</td>
                      <td>
                        <select
                          className="form-select"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td>{order.total_amount}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => cancelOrder(order.order_id)}
                        >
                          Cancel
                        </button>
                        <button className="btn btn-primary">View Details</button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={12} >
                        <div className="collapse multi-collapse" id={`orderCollapse${order.order_id}`}>
                          <div className="card card-body">
                            <h6>Items:</h6>
                            <div>
                              <ul className="list-group">
                                {order.order_items.map((item) => {
                                  const images = JSON.parse(item.product.images);
                                  return (
                                    <li key={item.order_items_id} className="list-group-item d-flex flex-sm-column flex-md-row gap-2">
                                      <div className="col-2">
                                        <img src={images[0]} alt={item.product.name} className="w-100" />
                                      </div>
                                      <div>
                                        {item.product.name} - <span className="fw-bold">${item.product.currPrice}</span>
                                        <p className="mt-3">Quantity: {item.quantity}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Color: {item.color}</p>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <h6 className="mt-3">Shipping address:</h6>
                            <div className="card mb-3">
                              <div className="card-body">
                                <h5 className="card-title">{address.firstName} {address.lastName}</h5>
                                <p className="card-text">
                                  {address.address1}, {address.address2}, {address.townCity}, {address.province}, {address.postCode}
                                </p>
                                <p className="card-text">{address.country}</p>
                              </div>
                            </div>
                            {order.coupon_code.length > 0 && <p className="mt-3">Coupon: {order.coupon_code}</p>}
                            <p className="mt-3">Total: ${order.total_amount}</p>
                            <p>Status: {order.status}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary me-2" onClick={exportOrdersAsCSV}>
            Download
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </>
  );
};

export default AdminOrders;
