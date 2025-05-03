import React, { useState } from "react";
import { Input, Menu, Dropdown, Modal } from "antd";
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
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (query === "") {
        navigate("/category");
      } else {
        navigate(`/category?keyword=${query}`);
      }
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="change-password" onClick={() => {
        navigate("/auth/change-password");
        setDropdownVisible(false);
      }}>
        Change Password
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => {
        logout();
      }}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div className="header-logo" onClick={() => navigate("/")}>
            <img src="/assets/Logo.svg" alt="logo" className="header-logo-image" />
          </div>
          {!loading && user && (
            <div className="header-search">
              <Input
                placeholder="Search something here"
                onKeyDown={handleSearch}
                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
              />
            </div>
          )}
        </div>

        {!loading &&
          (user ? (
            <div className="header-right">
              <div className="header-like header-right-item">
                <i className="fa-solid fa-heart"></i>
              </div>
              <div className="header-notification header-right-item">
                <i className="fa-solid fa-bell"></i>
              </div>
              <div className="header-setting header-right-item">
                <i className="fa-solid fa-gear"></i>
              </div>

              {/* 👤 Dropdown for user menu */}
              <Dropdown
                overlay={menu}
                trigger={['click']}
                onVisibleChange={(visible) => setDropdownVisible(visible)}
                visible={isDropdownVisible}
              >
                <div className="header-user header-right-item" onClick={() => setDropdownVisible(!isDropdownVisible)}>
                  <i className="fa-solid fa-user"></i>
                </div>
              </Dropdown>
            </div>
          ) : (
            <ButtonUI content="Get Started" navigate="/auth/login" />
          ))}
      </div>
    </div>
  );
}
