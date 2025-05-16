import React from "react";
import "./SidebarAdmin.css";
import { useNavigate } from "react-router-dom";

export default function SidebarAdmin({ page, setPage }) {
  const navigate = useNavigate();
  const handleClick = (page, link) => {
    setPage(page);
    navigate(link);
  };
  return (
    <div className="sidebar-admin-container">
      <div className="sidebar-admin-item" style={{ color: page === 1 ? "white" : "#90A3BF", scale: page === 1 && "1.05", backgroundColor: page === 1 && "#3563E9" }} onClick={() => handleClick(1, '/admin')}>
        <i className="fa-solid fa-list"></i>
        <span className="sidebar-admin-title">Dashboard</span>
      </div>
      <div className="sidebar-admin-item" style={{ color: page === 2 ? "white" : "#90A3BF", scale: page === 2 && "1.05", backgroundColor: page === 2 && "#3563E9" }} onClick={() => handleClick(2, '/admin/create-rent')}>
        <i class="fa-solid fa-pen-to-square"></i>
        <span>Create Rent</span>
      </div>
      <div className="sidebar-admin-item" style={{ color: page === 3 ? "white" : "#90A3BF", scale: page === 3 && "1.05", backgroundColor: page === 3 && "#3563E9" }} onClick={() => handleClick(3, '/admin/user-list')}>
        <i className="fa-solid fa-comments"></i>
        <span className="sidebar-admin-title">User List</span>
      </div>
    </div>
  );
}
