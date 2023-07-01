import React, { useContext, useState } from 'react';

import signinImage from '../assets/sign.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.js';
import PreLoader from '../components/PreLoader';


const initialState = {
    fName: '',
    lName: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    email: ''
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    const [loading, setLoading] = useState(false)

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate()
    const { login, register } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            isSignup ? await register(form) : await login(form)
            navigate('/')
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <>
            {loading && <PreLoader />}
            <div className="auth__form-container">
                <div className="auth__form-container_fields">
                    <div className="auth__form-container_fields-content">
                        <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                        <form onSubmit={handleSubmit}>
                            {isSignup && (
                                <>
                                    <div className="auth__form-container_fields-content_input">
                                        <label htmlFor="fName">First Name</label>
                                        <input
                                            id="fName"
                                            name="fName"
                                            type="text"
                                            placeholder="First Name"
                                            onChange={handleForm}
                                            required
                                        />
                                    </div>
                                    <div className="auth__form-container_fields-content_input">
                                        <label htmlFor="lName">Last Name</label>
                                        <input
                                            id="lName"
                                            name="lName"
                                            type="text"
                                            placeholder="Last Name"
                                            onChange={handleForm}
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleForm}
                                    required
                                />
                            </div>
                            {isSignup && (
                                <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="mobileNo">Mobile Number</label>
                                    <input
                                        id="mobileNo"
                                        name="mobileNo"
                                        type="text"
                                        placeholder="Mobile Number"
                                        onChange={handleForm}
                                        required
                                    />
                                </div>
                            )}
                            {/*{isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}*/}
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleForm}
                                    required
                                />
                            </div>
                            {isSignup && (
                                <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={handleForm}
                                        required
                                    />
                                </div>
                            )}
                            <div className="auth__form-container_fields-content_button">
                                <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                            </div>
                        </form>
                        <div className="auth__form-container_fields-account">
                            <p>
                                {isSignup
                                    ? "Already have an account?"
                                    : "Don't have an account?"
                                }
                                <span onClick={switchMode}>
                                    {isSignup ? 'Sign In' : 'Sign Up'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="auth__form-container_image">
                    <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688140402284sign.png?alt=media&token=ac8a681f-5d69-4801-865c-cfd85112f4c1" alt="sign in" />
                </div>
            </div>
        </>
    )
}

export default Auth