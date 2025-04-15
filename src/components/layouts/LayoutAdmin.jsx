import React, { useState } from 'react'
import HeaderAdmin from './HeaderAdmin/HeaderAdmin'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from './SidebarAdmin/SidebarAdmin'

export default function LayoutAdmin() {
  const [page, setPage] = useState(1);
  return (
    <>
        <HeaderAdmin />
        <SidebarAdmin page={page} setPage={setPage}/>
        <Outlet />
    </>
  )
}
