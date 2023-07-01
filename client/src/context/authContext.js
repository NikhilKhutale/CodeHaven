import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { axiosInstance } from "../config";

// new context for the authentication state
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  // Setting current user object in sessionStorage with an expiration time
  const setSessionStorage = (user) => {
    const now = new Date();
    const expirationTime = now.getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    sessionStorage.setItem(
      "user",
      JSON.stringify({ user, expirationTime })
    );
    setCurrentUser(user);
  };

  // Clearing current user object from sessionStorage
  const clearSessionStorage = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
  };

  // a login request to the server and set the current user object
  const login = async (values) => {
    try {
      const res = await axiosInstance.post("api/auth/login", values);
      setSessionStorage(res.data);
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  };

  // a register request to the server and set the current user object
  const register = async (values) => {
    try {
      const res = await axiosInstance.post("api/auth/register", values);
      setSessionStorage(res.data);
    } catch (error) {
      console.error("Register error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  };

  // a logout request to the server and clear the current user object
  const logout = async () => {
    await axiosInstance.post("api/auth/logout");
    clearSessionStorage();
  };

  // Checking if there is a current user object in sessionStorage and set it if there is
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) {
      const now = new Date().getTime();
      if (now > userData.expirationTime) {
        clearSessionStorage();
      } else {
        setCurrentUser(userData.user);
      }
    }
  }, []);

  // Exporting authentication context provider with the current user object and authentication functions
  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
