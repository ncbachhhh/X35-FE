import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HeaderAdmin.css";
import { useAuth } from "../../../contexts/auth.context";

export default function HeaderAdmin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/");
  };

  return (
    <div className="header-admin-container" style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
      <button className="logout-button" onClick={logout}>
        Đăng xuất
      </button>
    </div>
  );
}
