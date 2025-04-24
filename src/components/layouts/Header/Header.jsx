import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import ButtonUI from "../../ui/ButtonUI/ButtonUI";
import { useAuth } from "../../../contexts/auth.context";

export default function Header() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (query === "") {
        navigate("/category");
      }
      if (query) {
        navigate(`/category?keyword=${query}`);
      }
    }
  };
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div className="header-logo" onClick={() => navigate("/")}>
            <img src="/assets/Logo.svg" alt="logo" className="header-logo-image" />
          </div>
          {!loading && user && (
            <div className="header-search">
              <Input placeholder="Search something here"  onKeyDown={handleSearch} prefix={<SearchOutlined style={{ color: "#aaa" }}/>} />
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
              <div className="header-user header-right-item">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          ) : (
            <ButtonUI content="Get Started" navigate="/auth/login" />
          ))}
      </div>
    </div>
  );
}
