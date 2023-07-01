import React, { useContext, useEffect, useState } from 'react'
import Logo from '../assets/Logo(6).png'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const tabs = ["home", "products", "orders", "blog", "categories", "coupons", "todo"]

const AdminNav = () => {

    const [isBtnActive, setIsBtnActive] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { logout } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/")
        } catch (err) {
            return err
        }
    }


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight * 0.9; // 90vh

            setIsSticky(scrollPosition >= viewportHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = () => {
        setIsBtnActive(!isBtnActive);
    };

    const handleNavigate = (tab) => {
        navigate(tab === 'home' ? '/' : `/${tab}`)
    }

    const handleUser = () => {
        navigate("auth")
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-dark">
            <div className="container-fluid">
                <button className={`navbar-toggler ${isBtnActive ? 'active' : ''}`} onClick={handleClick} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="line" style={{ backgroundColor: "white" }}></span>
                    <span className="line" style={{ backgroundColor: "white" }}></span>
                    <span className="line" style={{ backgroundColor: "white" }}></span>
                </button>
                <a className="navbar-brand d-flex align-items-center gap-1 custom-brand text-white" onClick={() => handleNavigate("home")}>
                    <img src={Logo} alt="Logo" style={{ height: "20px" }} />
                    CodeHaven
                </a>
                <div className='d-block d-lg-none'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person mx-1" viewBox="0 0 16 16" onClick={handleUser}>
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={handleLogout}>
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto" style={{ '--bs-nav-link-color': 'white' }}>
                        {tabs.map((tab) => (
                            <li key={tab} className="nav-item mx-2">
                                <a className="nav-link custom-size" onClick={() => handleNavigate(tab)}>{tab}</a>
                            </li>
                        ))}
                    </ul>

                    <ul className="navbar-nav d-none d-lg-flex" style={{ '--bs-nav-link-color': "white" }}>
                        <li className="nav-item">
                            <a className="nav-link custom-hover mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16" onClick={handleUser}>
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link custom-hover mx-2" onClick={handleLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav