import React from 'react'
import testimonial1 from '../assets/testimonial1.jpg'
import testimonial2 from '../assets/testimonial2.jpg'
import testimonial3 from '../assets/testimonial3.jpg'

const Testimonials = () => {
    return (
        <>
            <h2 className="text-center mb-4">Customer Love Stories</h2>
            <p className="text-center">Hear from our satisfied shoppers and their amazing experiences</p>
            <div id="testimonial-carousel" className="carousel slide my-5 my-5" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row">
                                <div className="testimonial-image col-md-6">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138883953testimonial1.jpg?alt=media&token=33db1161-2a6e-4975-bca6-aca6b3bc25a6" alt="Testimonial 1" />
                                </div>
                                <div className="testimonial-content col-md-6">
                                    <p>"I have been using Company XYZ's services for over a year, and I am extremely satisfied with the results. They have helped me increase my online presence and drive more traffic to my website. I highly recommend their services to anyone looking to grow their business."</p>
                                    <h5>Mike Johnson</h5>
                                    <p>Founder, GHI Enterprises</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container">
                            <div className="row">
                                <div className="testimonial-image col-md-6">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138921254testimonial2.jpg?alt=media&token=c4f47efc-e9b3-4820-bf22-a53c253bbb33" alt="Testimonial 2" />
                                </div>
                                <div className="testimonial-content col-md-6">
                                    <p>"The team at Company XYZ is exceptional. They are creative, efficient, and always deliver outstanding results. I have worked with them on multiple projects, and they have never disappointed. I highly recommend their services to anyone in need of digital marketing solutions."</p>
                                    <h5>Sarah Williams</h5>
                                    <p>CTO, JKL Technologies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container">
                            <div className="row">
                                <div className="testimonial-image col-md-6">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138956194testimonial3.jpg?alt=media&token=a2d701db-cd3a-407e-bc75-e6d08d680e4b" alt="Testimonial 2" />
                                </div>
                                <div className="testimonial-content col-md-6">
                                    <p>"The team at Company XYZ is exceptional. They are creative, efficient, and always deliver outstanding results. I have worked with them on multiple projects, and they have never disappointed. I highly recommend their services to anyone in need of digital marketing solutions."</p>
                                    <h5>Sarah Williams</h5>
                                    <p>CTO, JKL Technologies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonial-carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#testimonial-carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Testimonials