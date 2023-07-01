import React, { useState } from 'react';

const PersonalInformation = () => {

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title mb-4">Personal Information</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">Name:</label>
                    <span className="ms-2">John Doe</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email:</label>
                    <span className="ms-2">johndoe@example.com</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label fw-bold">Mobile No.:</label>
                    <span className="ms-2">1234567890</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label fw-bold">Address:</label>
                    <span className="ms-2">123 Main St, New York, NY</span>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
