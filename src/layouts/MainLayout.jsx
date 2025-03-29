import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../ui/menus/Navbar'
import Footer from '../ui/menus/Footer'
const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MainLayout