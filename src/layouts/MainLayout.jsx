import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/menus/Footer'
import CTA from '../ui/CTA'

const MainLayout = () => {
  return (
    <div class="overflow-hidden">
    <Outlet/>
    <CTA/>
    <Footer/>
    </div>
  )
}

export default MainLayout