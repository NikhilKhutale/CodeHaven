import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PreLoader from '../components/PreLoader';
import { axiosInstance } from '../config';

const Blog = () => {

    const [search, setSearch] = useState('');
    const [btnClick, setbtnClick] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleBtnClick = (event) => {
        event.preventDefault();
        setbtnClick(!btnClick)
    };

    useEffect(() => {
        async function loadBlogPosts() {
            try {
                setLoading(true);
                const response = await axiosInstance.get('api/blogs/getBlogPosts', {
                    params: {
                        search
                    }
                });
                setBlogs(response.data);
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

        loadBlogPosts();
    }, [btnClick]);

    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).replace(',', '');        

        const dayMonth = formattedDate.split(' ')[1] + ' ' + formattedDate.split(' ')[0];
        const year = formattedDate.split(' ')[2]
        return { dayMonth, year };
    };

    const handleNavigate = (blog) => {
        navigate(`/blog/${blog.title}`, {state : {...blog}})
    }


    return (
        <>
            {loading && <PreLoader />}
            <div className="blog-header mt-5 py-5">
                <h1>My E-commerce Blog</h1>
                <p>Welcome to our blog, where we share the latest trends and insights!</p>
            </div>

            <div className="container">
                <div className='d-flex justify-content-between mb-5'>
                    <form className="col-7 d-flex align-items-center gap-4">
                        <input type="text" className="input-field w-100 d-none d-lg-block" placeholder="Find blog..." value={search} onChange={handleInputChange}/>
                        <button className="button-primary d-none d-lg-block" onClick={handleBtnClick}>Explore</button>
                        <button className="button-primary d-lg-none" data-bs-toggle="modal" data-bs-target="#searchBlogModal"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <div className="dropdown">
                        <button className="secondary-button dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                            <li><a className="dropdown-item" href="#">Date</a></li>
                            <li><a className="dropdown-item" href="#">Title</a></li>
                            <li><a className="dropdown-item" href="#">Author</a></li>
                        </ul>
                    </div>
                </div>
                {/*<!-- Featured Posts -->*/}
                <div className="row">

                    {blogs.map((blog) => (
                        <div key={blog.id} className="col-md-6 col-lg-4 featured-post" onClick={() => handleNavigate(blog)}>
                            <div className="post-thumbnail">
                                <img src={blog.image} alt={blog.title} />
                                <div className="position-absolute bottom-0 end-0 px-2">
                                    <p className="m-0">{formatDate(new Date(blog.date).getTime()).dayMonth}</p>
                                    <p className="m-0">{formatDate(new Date(blog.date).getTime()).year}</p>
                                </div>
                            </div>
                            <h4>{blog.title}</h4>
                            <p className="mb-2">{blog.short}</p>
                            <a className="read-more-button">Read More <i className="fa-solid fa-angles-right arrow"></i></a>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="modal fade"
                id="searchBlogModal"
                tabIndex="-1"
                aria-labelledby="searchModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-4">
                                <input type="text" className="form-control input-field" placeholder="Find blog..."  value={search} onChange={handleInputChange}/>
                                <button className="button-primary" type="button" onClick={handleBtnClick}>Explore</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog