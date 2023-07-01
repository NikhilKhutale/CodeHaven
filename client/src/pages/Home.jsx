import React, { useEffect, useState } from 'react'
import MySlider from '../components/MySlider'
import CardTags from '../components/CardTags'
import FeaturedProductsHome from '../components/FeaturedProductsHome'
import AllCategories from '../components/AllCategories'
import Testimonials from '../components/Testimonials'
import PreLoader from '../components/PreLoader'

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="vh-100" style={{backgroundColor:"rgba(0, 0, 0, 0.5)"}}>
                <PreLoader />
            </div>
        )
    }

    return (
        <>
            <MySlider />
            <CardTags />
            <FeaturedProductsHome />
            <AllCategories />
            <Testimonials />
        </>
    )
}

export default Home