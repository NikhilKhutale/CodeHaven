import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Preloader from './PreLoader';
import { axiosInstance } from '../config';

const initialState = {
  code: '',
  info: '',
  percentage: '',
  tc: '',
  expairy_date: ''
}

const AdminCoupons = () => {

  const [add, setAdd] = useState(false)
  const [addCoupon, setaddCoupon] = useState(initialState)
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await axiosInstance.get("api/coupons/getCoupon")
        const updatedCoupons = res.data.filter(
          (coupon) => new Date(coupon.expairy_date) > new Date()
        );
        setCoupons(updatedCoupons);
        const expiredCoupons = res.data.filter(
          (coupon) => new Date(coupon.expairy_date) <= new Date()
        );
        if (expiredCoupons.length > 0) {
          for (let i = 0; i < expiredCoupons.length; i++) {
            const deleteRes = await axiosInstance.delete(
              `api/coupons/${expiredCoupons[i].id}`
            );
          }
        }
      } catch (err) {
        console.error(err);
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
  }, [])


  const handleChange = (e) => {
    setaddCoupon({ ...addCoupon, [e.target.name]: e.target.value });
  }


  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("api/coupons/addCoupon", addCoupon)
      const newItem = res.data;
      setCoupons((prevItems) => [...prevItems, newItem]);
      Swal.fire({
        title: 'Task',
        text: `${res.data.msg} !`,
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


  const handleAdd = () => {
    setAdd(prev => !prev)
  }

  return (
    <>
      {loading && <Preloader />}
      <div className="container my-2 py-4 px-4 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <button className="button-primary mb-3" onClick={handleAdd}>Add New Coupon</button>
        {add && (
          <div className="row">
            <div className="col-lg-6 mb-3 animate__animated animate__fadeIn">
              <label htmlFor="code">Coupon</label>
              <input
                type="text"
                className='form-control input-field'
                id='code'
                name='code'
                required='true'
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 mb-3 animate__animated animate__fadeIn">
              <label htmlFor="info">Info</label>
              <input
                type="text"
                className='form-control input-field'
                id='info'
                name='info'
                required='true'
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 mb-3 animate__animated animate__fadeIn">
              <label htmlFor="tc">T & C</label>
              <textarea
                type="text"
                className='form-control input-field'
                id='tc'
                name='tc'
                required='true'
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 mb-3 animate__animated animate__fadeIn">
              <label htmlFor="percentage">Percentage</label>
              <input
                type="number"
                className='form-control input-field'
                id='percentage'
                name='percentage'
                required='true'
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6  animate__animated animate__fadeIn">
              <label htmlFor="expairy_date">Set expairy date</label>
              <input type="date" className='form-control input-field' id='expairy_date' name='expairy_date' onChange={handleChange} />
            </div>
            <div className="text-center mt-5  animate__animated animate__fadeIn">
              <button className='button-primary' onClick={handleSubmit}>Add Coupon</button>
            </div>
          </div>
        )}
      </div>

      <div className="container my-2 py-3 rounded px-5" style={{ backgroundColor: "#e3f2fd" }}>
        <h4>Available Coupons</h4>
        <p>Already deleting the coupons which are expaired !</p>
        <div className='table-responsive'>
          <table className="table  table-borderless">
            <thead >
              <tr className="header-row">
                <th scope="col">Coupon Name</th>
                <th scope="col">Valid Till</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((Coupon, index) => (
                <tr key={Coupon.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className='align-middle'>
                    {Coupon.code}
                  </td>
                  <td className='align-middle'>{Coupon.validTill}</td>
                  <td className='align-middle'>{Coupon.info}</td>
                  <td className='align-middle'>View T&C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminCoupons