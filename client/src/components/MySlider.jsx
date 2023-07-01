import React, { useState, useEffect } from 'react';

import 'animate.css';
import { useNavigate } from 'react-router-dom';

const MySlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate()

  const slides = [
    {
      slide: "https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688136221245slide1.jpg?alt=media&token=ca52d473-8c6c-475c-9c76-229094d055c8",
      heading: "Summer Essentials",
      desc: "Beat the Heat with our Must-Have Collection"
    },
    {
      slide: "https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688137869276slide2.jpg?alt=media&token=517807c4-1997-48ba-a5b5-3685246cee6c",
      heading: "Accessorize Your Way",
      desc: "Step into Style and Comfort with our Shoe Collection"
    },
    {
      slide: "https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688137921901slide3.jpg?alt=media&token=ba95672e-b44c-48e7-a5f5-3e884c5ee09b",
      heading: "Footwear Finesse",
      desc: "Elevate Your Style with our Fashion Accessories"
    },
  ]

  const buttons = [
    { id: 1, index: 0 },
    { id: 2, index: 1 },
    { id: 3, index: 2 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  const handleNavigate = () => {
    navigate('/shop')
  }

  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false">
        <div className="carousel-inner">
          {slides.map((Slide, index) => (
            <div key={Slide.slide} className={`col-12 vh-100 carousel-item slider-before ${activeIndex === index ? 'active' : ''}`} style={{ background: `url(${Slide.slide}) center/cover` }}>
              <div className="carousel-caption d-md-block">
                <h1 className='animate__animated animate__fadeInUp fw-bold'>{Slide.heading}</h1>
                <p className='animate__animated animate__fadeInUp lead'>{Slide.desc}</p>
                <button className='btn btn-primary custom-btn animate__animated animate__fadeInUp px-4 py-2' onClick={handleNavigate}>Shop Now</button>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-indicators">
          {buttons.map((button) => (
            <button
              key={button.id}
              type="button"
              className={activeIndex === button.index ? 'active' : ''}
              onClick={() => handleIndicatorClick(button.index)}
            ></button>
          ))}
        </div>
      </div>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688137983500Limited-Time-Discount.jpg?alt=media&token=6c8f5f26-0c79-41bf-9330-5fd74a7b714b" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138027867flash-sale.jpg?alt=media&token=bca7fd78-c517-4366-a0f4-3457696487bd" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default MySlider;
