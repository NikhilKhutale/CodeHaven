import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Preloader from './PreLoader'
import { axiosInstance } from '../config'

const initialState = {
  name: "",
  desc: ""
}

const AdminCategories = () => {

  const [add, setAdd] = useState(false)
  const [category, setCategory] = useState(initialState)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setAdd(prev => !prev)
  }


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axiosInstance.get('api/categories/getCat');
        console.log(response)
        setCategories(response.data);
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

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
    console.log(category)
  }

  const handleSubmit = async () => {
    if (category.name.length < 1 || category.desc.length < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You have to write something!',
      });
      return
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post("api/categories/addCat", category)
      const newItem = res.data;
      setCategories((prevItems) => [...prevItems, newItem]);
      setCategory({
        name: "",
        desc: ""
      })
      Swal.fire({
        title: 'Category',
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


  return (
    <>
      {loading && <Preloader />}
      <div className="container my-2 py-4 px-4 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <button className="button-primary mb-3" onClick={handleAdd}>Add New Category</button>
        {add && (
          <>
            <div className="row">
              <div className="col-lg-6 animate__animated animate__fadeIn">
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  className='form-control input-field'
                  id='name'
                  name='name'
                  required
                  value={category.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 animate__animated animate__fadeIn">
                <label htmlFor="desc">Description</label>
                <textarea
                  type="text"
                  className='form-control input-field'
                  id='desc'
                  name='desc'
                  required
                  value={category.desc}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center mt-5">
              <button className='button-primary' onClick={handleSubmit}>Add</button>
            </div>
          </>
        )}
      </div>

      <div className="container my-2 py-3 rounded px-5" style={{ backgroundColor: "#e3f2fd" }}>
        <h4>Available Categories</h4>
        <div className='table-responsive'>
          <table className="table  table-borderless">
            <thead >
              <tr className="header-row">
                <th scope="col">Category</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className='align-middle'>
                    {cat.name}
                  </td>
                  <td className='align-middle'>{cat.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminCategories