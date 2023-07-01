import React, { useEffect } from 'react'
import DOMPurify from "dompurify";
import { useLocation, useNavigate } from 'react-router-dom';

const SingleBlog = () => {

    const location = useLocation();
    const navigate = useNavigate()
    const blog = location.state;

    useEffect(() => {
        if(!blog) {
            navigate('/blog')
        };
    }, []);

    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).replace(',', '');        

        const dayMonthYear = formattedDate.split(' ')[1] + ' | ' + formattedDate.split(' ')[0] + " | " + formattedDate.split(' ')[2];
        return dayMonthYear;
    };

    return (
        <div className='container  mt-5 py-5'>
            <div className="row justify-content-center">
                <div className="col-11 col-lg-8">
                    <div className="post-thumbnail">
                        <img src={blog?.image} alt={blog?.title} className='w-100' />
                    </div>
                    <div className='my-3'>
                        <h4>{blog?.title}</h4>
                        <h6>{formatDate(new Date(blog?.date).getTime())}</h6>
                    </div>
                    <div className='blog-content mw-100' dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog?.content, { ADD_TAGS: ['iframe'] }),
                    }}></div>
                    <div className='d-flex'><h6>Tags : </h6>{blog?.tags}</div>
                </div>
            </div>
        </div>
    )
}

export default SingleBlog