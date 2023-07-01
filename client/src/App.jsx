import React, { useContext } from 'react'
import './App.css'
import Footer from './components/Footer'
import Shop from './components/Shop'
import CartPage from './components/CartPage'
import Billing from './components/Billing'
import Navbar from './components/Navbar'
import About from './pages/About'
import Blog from './pages/Blog'
import PreLoader from './components/PreLoader'
import AdminNav from './components/AdminNav'
import AdminHome from './components/AdminHome'
import AdminProducts from './components/AdminProducts'
import AdminOrders from './components/AdminOrders'
import AdminBlogs from './components/AdminBlogs'
import AdminCategories from './components/AdminCategories'
import AdminCoupons from './components/AdminCoupons'
import AdminToDo from './components/AdminToDo'

import {
  RouterProvider,
  createHashRouter,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { AuthContext } from './context/authContext'
import SingleProduct from './components/SingleProduct'
import PaymentSuccess from './components/PaymentSuccess'
import UserAccount from './components/UserAccount'
import SingleBlog from './components/SingleBlog'

const Layout = () => {
  return (
    <React.Suspense fallback={<PreLoader />}>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Suspense>
  )
}

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "blog",
        element: <Blog />,
        errorElement: <ErrorPage />,
      },
      {
        path: "blog/:title",
        element: <SingleBlog />,
        errorElement: <ErrorPage />,
      },
      {
        path: "shop",
        element: <Shop />,
        errorElement: <ErrorPage />,
      },
      {
        path: "shop/:id",
        element: <SingleProduct />,
        errorElement: <ErrorPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "billing",
        element: <Billing />,
        errorElement: <ErrorPage />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />,
        errorElement: <ErrorPage />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: "auth",
        element: <Auth />,
        errorElement: <ErrorPage />,
      },
      {
        path: "userAccount",
        element: <UserAccount />,
        errorElement: <ErrorPage />,
      },
    ]
  }
])


const AdminDashboardLoyout = () => {
  return (
    <React.Suspense fallback={<PreLoader />}>
      <AdminNav />
      <Outlet />
    </React.Suspense>
  )
}

const adminRouter = createHashRouter([
  {
    path: "/",
    element: <AdminDashboardLoyout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AdminHome />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/products",
        element: <AdminProducts />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/orders",
        element: <AdminOrders />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/blog",
        element: <AdminBlogs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/categories",
        element: <AdminCategories />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/coupons",
        element: <AdminCoupons />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/todo",
        element: <AdminToDo />,
        errorElement: <ErrorPage />,
      },
    ]
  }
])

const App = () => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser && currentUser.role === 'admin') {
    return (
      <RouterProvider router={adminRouter} />
    );
  }
  return (
    <RouterProvider router={router} />
  )
}

export default App