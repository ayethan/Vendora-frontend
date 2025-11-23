import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
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




function AllRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product' element={<Product />} />
          <Route path='/card' element={<Card />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/admin' element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path='users' element={<UserList />} />
            <Route path='products' element={<ProductList />} />
            <Route path='orders' element={<OrderList />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes
