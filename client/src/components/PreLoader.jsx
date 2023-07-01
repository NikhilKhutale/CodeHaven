import React from 'react'
import LogoPreloader from '../assets/Logo(5)Preloader.gif'

const PreLoader = () => {
  return (
    <div className='d-flex align-items-center justify-content-center vh-100 vw-100 bg-transparent z-3 position-fixed top-0 start-0'>
        <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688138738169Logo(5)Preloader.gif?alt=media&token=f42f2000-b690-4542-9133-9f2c531d9224" alt="" style={{height:"80px"}} />
    </div>
  )
}

export default PreLoader