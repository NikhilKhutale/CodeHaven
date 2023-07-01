import React from 'react'
import { useNavigate } from 'react-router-dom'

const AllCategories = () => {
    const cats = [
        {
            id: 1,
            img: "https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138119683mens-cat.jpg?alt=media&token=b390f816-a91e-42e6-9144-6c5b56b22aa0",
            alt: "Mens Wear"
        },
        {
            id: 2,
            img: "https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138160798women-cat.jpg?alt=media&token=b1d86ede-fdec-43ce-b876-ba88c4d58071",
            alt: "Womens Wear"
        },
        {
            id: 3,
            img: "https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138193459kids-cat.jpg?alt=media&token=997b2628-ce84-461e-b42a-4899cbef23cb",
            alt: "Kids Wear"
        },
        {
            id: 4,
            img: "https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138219745accessories-cat.jpg?alt=media&token=7261f295-3c9d-4b43-a057-366aab5a40ee",
            alt: "Accessories"
        }
    ]

    const navigate = useNavigate()

    const handleNavigate = (cat) => {
        navigate(`/shop?search=${encodeURIComponent(cat)}`)
    }
    return (
        <div className='container py-5 '>
            <h2 className="text-center mb-4">All Categories</h2>
            <div className='row'>
                {cats.map((cat) => (
                    <div key={cat.id} className='col-6 col-md-3' onClick={() => handleNavigate(cat.alt)}>
                        <img src={cat.img} className='w-100 h-auto' alt={cat.alt} style={{ cursor: "pointer" }} />
                        <div className="product-details">
                            <p className="product-name">{cat.alt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllCategories