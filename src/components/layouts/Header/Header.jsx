import React from "react";
import { Input } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div className="header-logo">
            <img src="/assets/Logo.svg" alt="logo" className="header-logo-image" />
          </div>
          <div className="header-search">
            <Input placeholder="Search something here" prefix={<SearchOutlined style={{ color: "#aaa" }} />} suffix={<SettingOutlined style={{ color: "#aaa" }} />} />
          </div>
        </div>
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
          <div className="header-user header-right-item">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
