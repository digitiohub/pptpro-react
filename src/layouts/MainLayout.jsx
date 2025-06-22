import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/menus/Footer'
const MainLayout = () => {
  return (
    <div class="overflow-hidden">
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default MainLayout