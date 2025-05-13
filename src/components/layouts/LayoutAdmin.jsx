import React, { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import { useAuth } from "../../contexts/auth.context";

export default function LayoutAdmin() {
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin page={page} setPage={setPage} />
      <Outlet />
    </>
  );
}
