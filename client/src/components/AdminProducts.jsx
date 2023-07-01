import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Preloader from './PreLoader';
import axios from "axios"
import ImageUploader from './ImageUploader';
import { axiosInstance } from '../config';

const AdminProducts = () => {

  const sortBy = ["New Arrival", "Featured", "Offer", "Price", "Popularity"]

  const [product, setProduct] = useState({
    name: '',
    category: '',
    short: '',
    desc: '',
    currPrice: '',
    prevPrice: '',
    details: '',
    sortBy:""
  })
  const [add, setAdd] = useState('add')
  const [size, setSize] = useState('')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [image, setImage] = useState('')
  const [selectedIamges, setSelectedIamges] = useState([])
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState('');
  const [deleteId, setDeleteId] = useState('')
  const [olderProducts, setOlderProducts] = useState([])
  const [color, setColor] = useState('')
  const [colorNames, setColorNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axiosInstance.get('api/products/');
        setOlderProducts(res.data);
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

  const handleColorChange = (e) => {
    setColor(e.target.value)
  }

  const handleAddColor = (Color) => {
    if (colorNames.includes(Color)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This size is already selected!',
      });
      return;
    }
    setColorNames([...colorNames, Color])
    setColor('')
  }

  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }

  const handleAddSize = (size) => {
    if (selectedSizes.includes(size)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This size is already selected!',
      });
      return;
    }
    setSelectedSizes([...selectedSizes, size])
    setSize('')
  }

  const handleAddImage = (e) => {
    setImage(e.target.value)
  }

  const handleSelectedImages = (image) => {
    if (selectedIamges.includes(image)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This image is already added!',
      });
      return;
    }

    setSelectedIamges([...selectedIamges, image])
    setImage('')
  }

  const removeImage = (index) => {
    setLoading(true)
    const images = [...selectedIamges];
    images.splice(index, 1);
    setSelectedIamges(images);
    setLoading(false)
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    const emptyFields = [];

    Object.entries(product).forEach(([key, value]) => {
      if (!value) {
        emptyFields.push(key);
      }
    });

    if (emptyFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Please fill in the following fields: ${emptyFields.join(", ")}`,
      });
      return;
    }

    try {
      setLoading(true)
      const res = await axiosInstance.post("api/products/addProduct", { ...product, colors: [...colorNames], sizes: [...selectedSizes], images: [...selectedIamges] })

      Swal.fire({
        icon: 'success',
        title: `${product.name}`,
        text: "is added successfully !",
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleProdId = (e) => {
    setProductId(e.target.value)
  }

  const handleGetProduct = async (productId) => {
    try {
      setLoading(true)
      const res = await axiosInstance.get(`api/products/${productId}`)
      setProduct({
        name: res.data.name,
        category: res.data.category,
        short: res.data.short,
        desc: res.data.desc,
        currPrice: res.data.currPrice,
        prevPrice: res.data.prevPrice,
        details: res.data.details,
      })
      setSelectedIamges([...res.data.images])
      Swal.fire({
        icon: 'success',
        title: `${product.name}`,
        text: "is rendered successfully !",
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateProduct = async (productId) => {
    try {
      setLoading(true)
      const res = await axiosInstance.put(`api/products/${productId}`, { ...product, colors: [...colorNames], sizes: [...selectedSizes], images: [...selectedIamges] })

      Swal.fire({
        icon: 'success',
        title: `${product.name}`,
        text: "is updated successfully !",
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteId = (e) => [
    setDeleteId(e.target.value)
  ]

  const handleDeleteProduct = async (deleteId) => {
    try {
      setLoading(true)
      const res = await axiosInstance.delete(`api/products/${deleteId}`)
      Swal.fire({
        text: `${res.data} !`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.log(error)
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
      <ImageUploader />
      <div className="container my-2 py-3 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="row justify-content-center gap-3">
          <button onClick={() => setAdd('add')} className="button-primary col-5 col-lg-2">Add Product</button>
          <button onClick={() => setAdd('update')} className="secondary-button col-5 col-lg-2">Update Product</button>
        </div>
      </div>
      {add === "update" && (
        <div className="input-group container my-2 py-3 rounded" style={{ backgroundColor: "#e3f2fd" }}>
          <input type="text" name='productId' required value={productId} onChange={handleProdId} className="form-control input-field" placeholder="Enter product id.." />
          <button className="button-primary" onClick={() => handleGetProduct(productId)}>Get product</button>
        </div>
      )}
      <div className="container my-2 py-3 px-4 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <div className='row'>
          <div className="col-lg-6 mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className='form-control input-field'
              id='name'
              name='name'
              required
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className='form-control input-field'
              id='category'
              name='category'
              required
              value={product.category}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="short">Short Desc</label>
            <textarea
              type="text"
              className='form-control input-field'
              id='short'
              name='short'
              required
              value={product.short}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="desc">Description</label>
            <textarea
              type="text"
              className='form-control input-field'
              id='desc'
              name='desc'
              required
              value={product.desc}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="currPrice">Current Price</label>
            <input
              type="number"
              className='form-control input-field'
              id='currPrice'
              name='currPrice'
              required
              value={product.currPrice}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="prevPrice">Previous Price</label>
            <input
              type="number"
              className='form-control input-field'
              id='prevPrice'
              name='prevPrice'
              required
              value={product.prevPrice}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              className='form-control input-field'
              id='details'
              name='details'
              required
              value={product.details}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="colorName">Select color</label>

            <div className="input-group">
              <input
                type="text"
                id="colorName"
                name="colorName"
                className="form-control input-field"
                value={color}
                onChange={handleColorChange}
              />
              <button className="button-primary" onClick={() => handleAddColor(color)}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className='mt-1'>
              {colorNames.map((color) => (
                <span key={color} className='me-1' style={{ backgroundColor: `${color}` }}>{color}, </span>
              ))}
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="size">Select size</label>
            <div className="input-group">
              <input type="text" id="size" name='size' className='form-control input-field' value={size} onChange={handleSizeChange} />
              <button className="button-primary" onClick={() => handleAddSize(size)}><i className="fa-solid fa-plus"></i></button>
            </div>
            <div className='mt-1'>
              {selectedSizes.map((size) => (
                <span key={size}>{size}, </span>
              ))}
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="image">Add images</label>
            <div className="input-group">
              <input type="text" id='image' name='image' className='form-control input-field' value={image} onChange={handleAddImage} />
              <button className="button-primary" onClick={() => handleSelectedImages(image)}><i className="fa-solid fa-plus"></i></button>
            </div>
            <div className="row gap-1 mt-1">
              {selectedIamges.map((image, index) => (
                <div key={image} className='col-2' style={{ position: 'relative' }}>
                  <img src={image} alt="PROD-IMG" className='w-100' />
                  <i className="fa-solid fa-circle-xmark position-absolute top-0 end-0" onClick={() => removeImage(index)}></i>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="sortBy">Details</label>
            <select className="form-control input-field" id='sortBy' name='sortBy' value={product.sortBy} onChange={handleChange}>
              {sortBy.map((option) => (
                <option key={option} value={option.toLowerCase()}>{option}</option>
              ))}
            </select>
          </div>
          <div className="text-center mt-5">
            <button className='button-primary' onClick={add === 'add' ? handleSubmit : () => handleUpdateProduct(productId)}>{add === 'add' ? "Add" : "Update"} Product</button>
          </div>
        </div>
      </div>

      <div className="container my-2 py-4 px-4 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <h4>Delete Product</h4>
        <div className="input-group">
          <input
            type="text"
            className='form-control input-field'
            id='deleteId'
            name='deleteId'
            required
            value={deleteId}
            onChange={handleDeleteId}
          />
          <button className="button-primary" onClick={() => handleDeleteProduct(deleteId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="container my-2 py-4 px-4 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <h4>Products which are updated before one month</h4>
        <table className="table  table-borderless">
          <thead >
            <tr className="header-row">
              <th scope="col">Product</th>
              <th scope="col">Id</th>
            </tr>
          </thead>
          <tbody>
            {olderProducts.map((product, index) => (
              <tr key={product.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td className='align-middle'>
                  <img src={product.image} style={{ width: '100px' }} />
                  {product.name}
                </td>
                <td className='align-middle'>{product.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminProducts