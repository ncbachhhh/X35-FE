import React, { useState } from "react";
import { Input, Dropdown } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import ButtonUI from "../../ui/ButtonUI/ButtonUI";
import { useAuth } from "../../../contexts/auth.context";
import axios from "axios";

export default function Header() {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setDropdownVisible(false);
    navigate("/auth/login"); // Điều hướng sau logout
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query === "") {
      navigate("/category");
    } else {
      navigate(`/category?keyword=${query}`);
    }
  };

  // Chuyển Menu JSX thành array items theo AntD v5+
  const items = [
    {
      key: "history",
      label: "Rent History",
      onClick: () => {
        navigate("/history");
        setDropdownVisible(false);
      },
    },
    {
      key: "change-password",
      label: "Change Password",
      onClick: () => {
        navigate("/auth/change-password");
        setDropdownVisible(false);
      },
    },
    {
      key: "logout",
      label: "Logout",
      onClick: logout,
    },
  ];

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div className="header-logo" onClick={() => navigate("/")}>
            <img src="/assets/Logo.svg" alt="logo" className="header-logo-image" />
          </div>
          {!loading && user && (
            <div className="header-search">
              <Input placeholder="Search something here" onPressEnter={handleSearch} prefix={<SearchOutlined style={{ color: "#aaa" }} />} />
            </div>
          )}
        </div>

        {!loading && user ? (
          <div className="header-right">
            <div className="header-like header-right-item" onClick={() => navigate("/liked-cars")}>
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="header-notification header-right-item">
              <i className="fa-solid fa-bell"></i>
            </div>
            {/* 👤 Dropdown for user menu */}
            <Dropdown menu={{ items }} trigger={["click"]} onOpenChange={(open) => setDropdownVisible(open)} open={isDropdownVisible}>
              <span className="header-user header-right-item" style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-user"></i>
              </span>
            </Dropdown>
          </div>
        ) : (
          <ButtonUI content="Get Started" navigate="/auth/login" />
        )}
      </div>
    </div>
  );
}
