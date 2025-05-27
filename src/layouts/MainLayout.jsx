import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/menus/Footer'
const MainLayout = () => {
  return (
    <>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MainLayout