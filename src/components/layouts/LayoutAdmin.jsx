import React, { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import { useAuth } from "../../contexts/auth.context";

export default function LayoutAdmin() {
  const [page, setPage] = useState(1);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth/login");
      } else if (user.role !== "admin") {
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin page={page} setPage={setPage} />
      <Outlet />
    </>
  );
}
