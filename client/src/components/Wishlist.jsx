import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PreLoader from './PreLoader';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { axiosInstance } from '../config';

const Wishlist = () => {
    
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (currentUser) {
                    const wishlistResponse = await axiosInstance.get(`api/wishlist/${currentUser.id}`);

                    setWishlist(wishlistResponse.data);
                } else {
                    navigate('/')
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRemoveWishlist = async (wishlist_id, name) => {
        try {

            setLoading(true)
            await axiosInstance.delete("api/wishlist/removeWishlist", {
                data: {
                    user_id: currentUser.id,
                    wishlist_id: wishlist_id,
                }
            })
            setWishlist((prevState) => prevState.filter((product) => product.wishlist_id !== wishlist_id));
            Swal.fire({
                title: name,
                text: 'is deleted from wishlist!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(null);
        }
    };

    return (
        <>
            {loading && <PreLoader />}
            <div>
                <h2>Wishlist</h2>
                {wishlist.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist.map(item => {
                                const images = JSON.parse(item.images)
                                return(
                                <tr key={item.wishlist_id}>
                                    <td>
                                        <img src={images[0]} alt={item.name} style={{width:"30px"}}/>
                                        {item.name}</td>
                                    <td>${item.currPrice}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleRemoveWishlist(item.wishlist_id, item.name)}>Remove</button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </>
    );
};

export default Wishlist;
