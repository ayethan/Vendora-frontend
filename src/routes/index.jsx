import React from 'react'
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Home from '../pages/Frontend/Home/Index.jsx'
import About from '../pages/About'
import Product from '../pages/Frontend/Product/Index'
import ProductDetail from '../pages/Frontend/Product/Detail'
import Checkout from '../pages/Frontend/Checkout/Index.jsx'
import CheckoutSuccess from '../pages/Frontend/Checkout/Success.jsx'
import Contact from '../pages/Contact'
import Cart from '../pages/Frontend/Cart/Index.jsx'
import Navbar from '../components/Navbar'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import Dashboard from '../pages/Admin/Dashboard'
import DashboardHome from '../pages/Admin/DashboardHome'
import ProductList from '../pages/Admin/products/ProductList'
import Category from '../pages/Admin/categories/Index'
import OrderList from '../pages/Admin/orders/OrderList'
import UserList from '../pages/Admin/users/UserList'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import AdminHeader from '../pages/Admin/layouts/Header'
import AdminFooter from '../pages/Admin/layouts/Footer'

import AdminRoute from './AdminRoute';




const PublicLayout = () => (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
);

const AdminLayout = () => (
    <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1">
            <Outlet />
        </main>
        <AdminFooter />
    </div>
);

function AllRoutes() {
    const user = useSelector((state) => state.user.user)

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/product' element={<Product />} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/checkout-success' element={<CheckoutSuccess />} />
                    <Route path='/signin' element={user?._id ? <Navigate to='/' replace /> : <SignIn />} />
                    <Route path='/signup' element={user?._id ? <Navigate to='/' replace /> : <SignUp />} />
                </Route>


                {/* Admin Routes */}
                <Route element={<AdminLayout />}>
                    <Route element={<AdminRoute />}>
                        <Route path='/admin' element={<Dashboard />}>
                            <Route index element={<DashboardHome />} />
                            <Route path='users' element={<UserList />} />
                            <Route path='products' element={<ProductList />} />
                            <Route path='orders' element={<OrderList />} />
                            <Route path='category' element={<Category />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes