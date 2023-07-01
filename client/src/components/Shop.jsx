import React, { useEffect, useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Range } from 'react-range';
import axios from 'axios';
import Preloader from './PreLoader'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Swal from 'sweetalert2';
import { axiosInstance } from '../config';

const Shop = () => {

    const [hovered, isHovered] = useState(null)
    const [min, setMinValue] = useState(200);
    const [max, setMaxValue] = useState(2499);
    const step = (max - min) / 4;
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [selectedSortBy, setSelectedSortBy] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [priceRange, setPriceRange] = useState([min, max]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            setCurrentPage(1)
            try {
                setLoading(true);
                const response = await axiosInstance.get('api/userProducts', {
                    params: {
                        sortBy: selectedSortBy,
                        items: selectedItems,
                        priceRange: priceRange,
                        sizes: selectedSizes,
                        colors: selectedColors,
                        currentPage: 1,
                        input: searchQuery,
                    },
                });

                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery, selectedSortBy, selectedItems, priceRange, selectedSizes, selectedColors]);

    const loadMoreItems = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('api/userProducts', {
                params: {
                    sortBy: selectedSortBy,
                    items: selectedItems,
                    priceRange: priceRange,
                    sizes: selectedSizes,
                    colors: selectedColors,
                    currentPage: currentPage,
                    input: searchQuery
                },
            });

            setProducts([...products, ...response.data]);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setSearchQuery(searchParams.get("search"));

    }, [location.search]);

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null, 
            threshold: 1, 
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (currentPage > 1) {
            loadMoreItems();
        }
    }, [currentPage]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        navigate(`/shop?search=${encodeURIComponent(inputValue)}`);
    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        const [mainCategory, subcategory] = value.split('-');

        setSelectedItems((prevItems) => {
            const item = `${mainCategory}-${subcategory}`;

            if (prevItems.includes(item)) {
                return prevItems.filter((prevItem) => prevItem !== item);
            } else {
                return [...prevItems, item];
            }
        });
    };

    const handlePriceChange = (priceRange) => {
        setPriceRange(priceRange);
    };

    const renderStepLabels = () => {
        const labels = [];
        for (let i = min; i <= max; i += step) {
            labels.push(
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: `${((i - min) / (max - min)) * 100}%`,
                        transform: 'translateX(-50%)',
                        fontSize: '12px'
                    }}
                >
                    {i}
                </div>
            );
        }
        return labels;
    };

    const categories = [
        {
            main: 'Menswear',
            subcategories: ['T shirts', 'Shirts', 'Pants', 'Jeans', 'Shorts', 'Jackets', 'Suits', 'Sweaters', 'Hoodies', 'Underwear']
        },
        {
            main: 'Womenswear',
            subcategories: ['Tops', 'Dresses', 'Skirts', 'Pants', 'Jeans', 'Shorts', 'Jackets', 'Blazers', 'Sweaters', 'Lingerie']
        },
        {
            main: 'KidsWear',
            subcategories: ['Tops', 'Bottoms', 'Dresses', 'Skirts', 'Pants', 'Jeans', 'Shorts', 'Jackets', 'Pajamas', 'Swimwear']
        },
        {
            main: 'Accessories',
            subcategories: ['Bags', 'Wallets', 'Belts', 'Hats', 'Scarves', 'Sunglasses', 'Watches', 'Jewelry', 'Gloves', 'Socks']
        }
    ];

    const sizes = ["Small", "Medium", "Large", "Extra Large"]
    const colors = ["Red", "Blue", "Black", "Navy"]
    const sortBy = ["New Arrival", "Featured", "Offer", "Price", "Popularity"]

    const handleSortByChange = (event) => {
        setSelectedSortBy(event.target.value);
    };

    const handleSizeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSizes((prevSizes) => [...prevSizes, value]);
        } else {
            setSelectedSizes((prevSizes) =>
                prevSizes.filter((size) => size !== value)
            );
        }
    };

    const handleColorChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedColors((prevColors) => [...prevColors, value]);
        } else {
            setSelectedColors((prevColors) =>
                prevColors.filter((color) => color !== value)
            );
        }
    };

    const handleHover = (id) => {
        isHovered(id)
    }

    const addToWishlist = async (product) => {
        if (currentUser) {
           
            try {
                setLoading(true)
                const res = await axiosInstance.post("api/wishlist/addWishlist", {
                    user_id: currentUser.id,
                    product_id: product.id
                })
                Swal.fire({
                    title: product.name,
                    text: res.data,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            } finally {
                setLoading(false);
            }
        } else {
           
            const storedWishlistItems = localStorage.getItem('wishlistItems');
            const wishlistItems = storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
            const wishlistItem = {
                user_id: null,
                ...product
            };
            const updatedWishlist = [...wishlistItems, wishlistItem];
            localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));

            Swal.fire({
                title: product.name,
                text: "added to wishlist!",
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    };

    function calculateOffer(prevPrice, currPrice) {
        var offer = 0;
        
        if (currPrice < prevPrice) {
          var difference = prevPrice - currPrice;
          offer = Math.floor((difference / prevPrice) * 100);
        }
        
        return offer;
      }

    return (
        <>
            {loading && <Preloader />}
            <div className="container-fluid mt-5 py-5">
                <div className='pb-5'>
                    <form className="d-flex align-items-center justify-content-center gap-1 gap-lg-4">
                        <input type="text" className="input-field col-9 col-lg-4" placeholder="Find your perfect item..." value={inputValue} onChange={handleInputChange} />
                        <button type="submit" className="button-primary d-none d-md-block" onClick={handleButtonClick}>Explore</button>
                        <button type="submit" className="button-primary d-md-none" onClick={handleButtonClick}><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        {/*Sort By and Filter section*/}
                        <div className="d-lg-none">
                            {/* Sort By and Filter modal trigger button */}
                            <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#sortFilterModal">
                                Sort By & Filter
                            </button>
                        </div>
                        <div className="d-none d-lg-block vh-100 overflow-y-auto  position-sticky top-0" style={{padding:"0 30px"}}>
                            {/* Sort By and Filter section content */}
                            <h4>Sort By</h4>
                            <select className="form-control input-field" value={selectedSortBy} onChange={handleSortByChange}>
                                {sortBy.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>{option}</option>
                                ))}
                            </select>
                            <h4 className='mt-4'>Filter</h4>
                            {/* Category Filter */}
                            <div>
                                {categories.map((category, index) => (
                                    <div key={index}>
                                        <div
                                            className="mb-2"
                                            style={{cursor:"pointer"}}
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#categoryCollapse${index}`}
                                        >
                                            {category.main}
                                        </div>
                                        <div className="collapse" id={`categoryCollapse${index}`}>
                                            <div className="pl-3">
                                                {category.subcategories.map((subcategory, subIndex) => (
                                                    <div key={subIndex} className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`subcategoryCheckbox${index}_${subIndex}`}
                                                            value={`${category.main}-${subcategory}`}
                                                            checked={selectedItems.includes(`${category.main}-${subcategory}`)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`subcategoryCheckbox${index}_${subIndex}`}
                                                        >
                                                            {subcategory}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Range Filter */}
                            <div className='mt-3'>
                                <h5>Price Range</h5>
                                <div className='mx-3'>
                                    <Range
                                        step={step}
                                        min={min}
                                        max={max} 
                                        values={priceRange}
                                        onChange={handlePriceChange}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                onMouseDown={props.onMouseDown}
                                                onTouchStart={props.onTouchStart}
                                                style={{
                                                    ...props.style,
                                                    height: '36px',
                                                    display: 'flex',
                                                    width: '100%'
                                                }}
                                            >
                                                <div
                                                    ref={props.ref}
                                                    style={{
                                                        height: '5px',
                                                        width: '100%',
                                                        borderRadius: '4px',
                                                        background: '#ccc',
                                                        alignSelf: 'center'
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '16px',
                                                    width: '16px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#fff',
                                                    boxShadow: '0px 2px 6px #AAA'
                                                }}
                                            />
                                        )}
                                        renderTrackHighlight={({ props }) => (
                                            <div
                                                style={{
                                                    ...props.style,
                                                    height: '5px',
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#0074D9'
                                                }}
                                            />
                                        )}
                                    />
                                    <div
                                        style={{
                                            position: 'relative',
                                        }}
                                    >
                                        {renderStepLabels()}
                                    </div>
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div className='mt-3'>
                                <h5>Size</h5>
                                {sizes.map((size) => (
                                    <div key={size} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`size_${size}`}
                                            value={size}
                                            checked={selectedSizes.includes(size)}
                                            onChange={handleSizeChange}
                                        />
                                        <label className="form-check-label" htmlFor={`size_${size}`}>{size}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Color Filter */}
                            <div className='mt-3'>
                                <h5>Color</h5>
                                {colors.map((color) => (
                                    <div key={color} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`color_${color}`}
                                            value={color}
                                            checked={selectedColors.includes(color)}
                                            onChange={handleColorChange}
                                        />
                                        <label className="form-check-label" htmlFor={`color_${color}`}>{color}</label>
                                    </div>
                                ))}
                            </div>

                            <button type="button" className="secondary-button">Reset Filters</button>
                        </div>

                    </div>
                    <div className="col-lg-9">
                        {/*} Products section */}
                        <div className="row">
                            {/*} Place your Product cards here */}
                            <AnimatePresence>
                                {products.map((product) => {
                                    const images = JSON.parse(product.images)
                                    const offerPercentage = calculateOffer(product.prevPrice, product.currPrice);
                                    return (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 40 }}
                                            transition={{ duration: 0.5 }}
                                            className="col-6 col-md-4 col-lg-3 mb-3"
                                            onClick={() => navigate(`/shop/${product.id}`, { state: product })}
                                        >
                                            <div className="featured-product mb-4" onMouseEnter={() => handleHover(product.id)} onMouseLeave={() => handleHover(null)} >
                                                {offerPercentage > 0 && <div className="ribbon">{offerPercentage}%</div>}
                                                {hovered === product.id ? (
                                                    <motion.div
                                                        key={product.id}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ duration: 0.5 }}
                                                        className="product-CTA"
                                                    >
                                                        <div className='product-CTA-wishlist rounded-circle mt-1' onClick={() => addToWishlist(product)}><i className="fa-regular fa-heart"></i></div>
                                                    </motion.div>
                                                ) : null}
                                                <img src={images[0]} className="featured-product-image" alt={product.name} />
                                                <div className="product-details">
                                                    <p className="product-name">{product.name}</p>
                                                </div>
                                                <div>
                                                    <span className="prevPrice mx-2">${product.prevPrice}</span>
                                                    <span className="currPrice">${product.currPrice}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>

            {/* Sort By and Filter modal */}
            <div className="modal fade" id="sortFilterModal" tabIndex="-1" aria-labelledby="sortFilterModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="sortFilterModalLabel">Sort By & Filter</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h4>Sort By</h4>
                            <select className="form-control  input-field" value={selectedSortBy} onChange={handleSortByChange}>
                                {sortBy.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>{option}</option>
                                ))}
                            </select>
                            <h4 className='mt-4'>Filter</h4>
                            <div>
                                {categories.map((category, index) => (
                                    <div key={index}>
                                        <button
                                            className="btn btn-link"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#categoryCollapse${index}`}
                                        >
                                            {category.main}
                                        </button>
                                        <div className="collapse" id={`categoryCollapse${index}`}>
                                            <div className="pl-3">
                                                {category.subcategories.map((subcategory, subIndex) => (
                                                    <div key={subIndex} className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`subcategoryCheckbox${index}-${subIndex}`}
                                                            value={`${category.main}-${subcategory}`}
                                                            checked={selectedItems.includes(`${category.main}-${subcategory}`)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`subcategoryCheckbox${index}-${subIndex}`}
                                                        >
                                                            {subcategory}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='mt-3'>
                                <h5>Price Range</h5>
                                <div className='px-2'>
                                    <Range
                                        step={step} 
                                        min={min} 
                                        max={max} 
                                        values={priceRange}
                                        onChange={handlePriceChange}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                onMouseDown={props.onMouseDown}
                                                onTouchStart={props.onTouchStart}
                                                style={{
                                                    ...props.style,
                                                    height: '36px',
                                                    display: 'flex',
                                                    width: '100%'
                                                }}
                                            >
                                                <div
                                                    ref={props.ref}
                                                    style={{
                                                        height: '5px',
                                                        width: '100%',
                                                        borderRadius: '4px',
                                                        background: '#ccc',
                                                        alignSelf: 'center'
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '16px',
                                                    width: '16px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#fff',
                                                    boxShadow: '0px 2px 6px #AAA'
                                                }}
                                            />
                                        )}
                                        renderTrackHighlight={({ props }) => (
                                            <div
                                                style={{
                                                    ...props.style,
                                                    height: '5px',
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#0074D9'
                                                }}
                                            />
                                        )}
                                    />
                                    <div
                                        style={{
                                            position: 'relative',
                                        }}
                                    >
                                        {renderStepLabels()}
                                    </div>
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div className='mt-3'>
                                <h5>Size</h5>
                                {sizes.map((size) => (
                                    <div key={size} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`size-${size}`}
                                            value={size}
                                            checked={selectedSizes.includes(size)}
                                            onChange={handleSizeChange}
                                        />
                                        <label className="form-check-label" htmlFor={`size-${size}`}>{size}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Color Filter */}
                            <div className='mt-3'>
                                <h5>Color</h5>
                                {colors.map((color) => (
                                    <div key={color} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`color-${color}`}
                                            value={color}
                                            checked={selectedColors.includes(color)}
                                            onChange={handleColorChange}
                                        />
                                        <label className="form-check-label" htmlFor={`color-${color}`}>{color}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Reset Filters */}
                            <button type="button" className="secondary-button">Reset Filters</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="secondary-button" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="button-primary">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={containerRef}>
            </div>
        </>
    )
}

export default Shop