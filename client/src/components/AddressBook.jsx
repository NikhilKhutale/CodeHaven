import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import PreLoader from './PreLoader';
import { axiosInstance } from '../config';

const AddressBook = () => {

    const initialState = {
        firstName: '',
        lastName: '',
        country: '',
        address1: '',
        address2: '',
        townCity: '',
        province: '',
        postCode: '',
    };
    const [loading, setLoading] = useState(false);
    const [addData, setAddData] = useState(initialState);
    const [inputErrors, setInputErrors] = useState({});
    const [address, setAddress] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        } else {
            async function fetchData() {
                try {
                    setLoading(true);

                    const addResponse = await axiosInstance.get(`api/address/allAddress/${currentUser.id}`);
                    setAddress(addResponse.data);
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
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAddData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleAdd = async (event) => {
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
        event.preventDefault();
        try {
            setLoading(true)

            const res = await axiosInstance.post("api/address/addAddress", { ...addData, user_id: currentUser.id })
            const newItem = res.data;
            setAddress((prevItems) => [...prevItems, newItem]);
            Swal.fire({
                title: 'Address',
                text: res.data,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteAdd = async (id) => {
        try {
            setLoading(id)

            await axiosInstance.delete(`api/address/${id}`);
            setAddress(address.filter(a => a.address_id !== id));
            Swal.fire(
                'Deleted!',
                'The address has been deleted.',
                'success'
            )
        } catch (error) {
            Swal.fire(
                'Error',
                'There was an error deleting the address.',
                'error'
            )
        } finally {
            setLoading(null);
        }
    }


    return (
        <>
            {loading && <PreLoader />}
            <div>
                <h2>Address Book</h2>
                <div className="mb-3">
                    <button className="button-primary" data-bs-toggle="collapse" data-bs-target="#editAddCollapse">Add New Address</button>
                    <form className="collapse card mt-4" id="editAddCollapse">
                        <div className="card-body">
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
                            <div className='text-center'>
                                <button className='button-primary' onClick={handleAdd}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                {address.map((address) => (
                    <div className="card mb-3" key={address.address_id}>
                        <div className="card-body">
                            <h5 className="card-title">{address.firstName} {address.lastName}</h5>
                            <p className="card-text">
                                {address.address1}, {address.address1}, {address.townCity}, {address.province}, {address.postCode}
                            </p>
                            <p className="card-text">{address.country}</p>
                            <button className="btn btn-primary me-2">Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteAdd(address.address_id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AddressBook;
