import React from 'react'
import HeaderAdmin from './HeaderAdmin/HeaderAdmin'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from './SidebarAdmin/SidebarAdmin'

export default function LayoutAdmin() {
  return (
    <>
        <HeaderAdmin />
        <SidebarAdmin />
        <Outlet />
    </>
  )
}
