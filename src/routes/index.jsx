import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Frontend/Home/Index.jsx'
import About from '../pages/About'
import Product from '../pages/Product'
import Contact from '../pages/Contact'
import Card from '../pages/Card'
import Navbar from '../components/Navbar'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import Dashboard from '../pages/Admin/Dashboard'
import DashboardHome from '../pages/Admin/DashboardHome'
import ProductList from '../pages/Admin/products/ProductList'
import OrderList from '../pages/Admin/orders/OrderList'
import UserList from '../pages/Admin/users/UserList'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'

function AllRoutes() {
    const user = useSelector((state) => state.user.user)
    const isAdmin = user?.role === 'Admin';
    console.log('user in routes:', user);

    return (
        <BrowserRouter>
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/product' element={<Product />} />
                    <Route path='/card' element={<Card />} />
                    <Route path='/signin' element={user?._id ? <Navigate to='/' replace /> : <SignIn />} />
                    <Route path='/signup' element={user?._id ? <Navigate to='/' replace /> : <SignUp />} />

                    <Route path='/admin' element={isAdmin ? <Dashboard /> : <Navigate to="/signin" replace />}>
                        <Route index element={<DashboardHome />} />
                        <Route path='users' element={<UserList />} />
                        <Route path='products' element={<ProductList />} />
                        <Route path='orders' element={<OrderList />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </div>
        </BrowserRouter>
    )
}

export default AllRoutes