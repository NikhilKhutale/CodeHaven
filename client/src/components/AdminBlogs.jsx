import React from 'react'
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar"
import 'react-quill/dist/quill.snow.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase"
import Swal from 'sweetalert2';
import axios from 'axios';
import Preloader from './PreLoader';
import ImageUploader from './ImageUploader';
import { axiosInstance } from '../config';

const initialValues = {
  title: '',
  image: '',
  tags: '',
  category: '',
  date: '',
  short: '',

}

const AdminBlogs = () => {
  const [blog, setBlog] = useState(initialValues);
  const [content, setContent] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value, content: content });
  }

  const handleSubmit = async () => {
    if (blog.title.length < 1 || blog.content.length < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You have to write something!',
      });
      return
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post("api/blogs/addPost", blog)
      setBlog({
        title: '',
        image: '',
        tags: '',
        category: '',
        date: '',
        short: '',

      })

      setContent('')

      Swal.fire({
        title: 'Blog',
        text: `${res.data} !`,
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
      <ImageUploader />
      <div className="container my-3 p-4 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <h3>Write blog</h3>
        <EditorToolbar toolbarId={'t1'} />
        <ReactQuill
          style={{ height: "82.5vh" }}
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder={"Write Something Here..."}
          modules={modules("t1")}
          formats={formats}
        />
      </div>

      <div className="container my-2 py-4 px-4 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="row">
          <div className="col-lg-6  mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className='form-control input-field'
              id='title'
              name='title'
              required
              value={blog.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6  mb-3">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              className='form-control input-field'
              id='image'
              name='image'
              required
              value={blog.image}
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
              value={blog.short}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              className='form-control input-field'
              id='tags'
              name='tags'
              required
              value={blog.tags}
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
              value={blog.category}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="date">Select date</label>
            <input type="date" className='form-control input-field' id='date' name='date' value={blog.date} onChange={handleChange} />
          </div>
          <div className="text-center mt-5">
            <button className='button-primary' onClick={handleSubmit} >Create blog</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminBlogs