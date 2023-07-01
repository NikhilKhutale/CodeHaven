import React, { useContext, useEffect, useState } from 'react'
import PersonalInformation from './PersonalInformation';
import OrderHistory from './OrderHistory';
import Wishlist from './Wishlist';
import AddressBook from './AddressBook';
import AccountSettings from './AccountSettings';
import ReturnRefundRequests from './ReturnRefundRequests';
import LoyaltyProgram from './LoyaltyProgram';
import HelpSupport from './HelpSupport';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const UserAccount = () => {

    const [activeComponent, setActiveComponent] = useState('PersonalInformation');
    const { logout, currentUser } = useContext(AuthContext);

    const navigate = useNavigate()

useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/")
        } catch (err) {
            return err
        }
    }

    const handleComponentClick = (componentName) => {
        setActiveComponent(componentName);
    };

    const links = ["PersonalInformation", "OrderHistory", "Wishlist", "AddressBook", "AccountSettings", "ReturnRefundRequests", "LoyaltyProgram", "HelpSupport"]
    return (
        <div className='container my-5 py-5'>
            <div className='d-flex justify-content-between  mb-5'>
                <button
                    className="navbar-toggler read-more-button"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavigation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="black" className="bi bi-arrow-right-circle arrow" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                </button>
                <button className="navbar-toggler read-more-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="black" className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={handleLogout}>
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </button>
            </div>
            <div
                className="offcanvas offcanvas-start custom-offcanvas-width"
                tabIndex="-1"
                id="offcanvasNavigation"
                aria-labelledby="offcanvasNavigationLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavigationLabel">
                        Navigation
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-group">
                        {links.map((link) => (
                            <li
                                key={link}
                                className={`list-group-item ${activeComponent === link && 'active custom-active'}`}
                                onClick={() => handleComponentClick(link)}
                                style={{ cursor: "pointer" }}
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            >
                                {link}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Render the selected component */}
            {activeComponent === 'PersonalInformation' && <PersonalInformation />}
            {activeComponent === 'OrderHistory' && <OrderHistory />}
            {activeComponent === 'Wishlist' && <Wishlist />}
            {activeComponent === 'AddressBook' && <AddressBook />}
            {activeComponent === 'AccountSettings' && <AccountSettings />}
            {activeComponent === 'ReturnRefundRequests' && <ReturnRefundRequests />}
            {activeComponent === 'LoyaltyProgram' && <LoyaltyProgram />}
            {activeComponent === 'HelpSupport' && <HelpSupport />}
        </div>
    )
}

export default UserAccount;