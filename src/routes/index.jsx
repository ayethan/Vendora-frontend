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
        </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes
