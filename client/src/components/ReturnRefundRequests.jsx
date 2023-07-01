import React, { useState } from 'react';

const ReturnRefundRequests = () => {
    const [returnRequests, setReturnRequests] = useState([
        { id: 1, orderNumber: 'ORD123456', status: 'Pending' },
        { id: 2, orderNumber: 'ORD789012', status: 'Approved' },
        { id: 3, orderNumber: 'ORD345678', status: 'Rejected' },
    ]);

    return (
        <div>
            <h2>Return and Refund Requests</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {returnRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.orderNumber}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReturnRefundRequests;
