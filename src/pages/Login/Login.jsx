import React, { useContext, useState } from "react";
import "./Login.css";
import { Button, Checkbox, Input, Form, message } from "antd";
import ButtonUI from "../../components/ui/ButtonUI/ButtonUI.jsx";
import { NavLink } from "react-router-dom";
import UserAPI from "../../APIs/user.api.js";
import { useNotification } from "../../contexts/notification.context.js";
import Loading from "../../components/ui/Loading/Loading.jsx";

export default function Login() {
  const { api } = useNotification();
  const [loading, setLoading] = useState(false);

  // Hàm xử lý khi người dùng submit form
  const onFinish = async (values) => {
    setLoading(true);
    const response = await UserAPI.login(values);

    setLoading(false);
    if (response.isSuccess) {
      // Đăng nhập thành công
      api.success({
        message: "Login successful",
        description: "Welcome back!",
        duration: 1.5,
      });

      // Chuyển hướng
      window.location.href = "/";
    } else {
      // Đăng nhập thất bại, hiển thị thông báo lỗi

      api.error({
        message: "Login failed",
        description: response.message,
        duration: 1.5,
      });
    }
  };

  return (
    <div className="login-container">
      {/* Hero */}
      <div className="hero-1 hero" style={{ width: "55%" }}>
        <div className="hero-text">
          <h1>The Best Platform for Car Rental</h1>
          <p>This is a simple hero section with a title and some text.</p>
        </div>
        <ButtonUI content="Rental Car" />
        <img src="/assets/image 7.png" className="hero-img" />
      </div>

      {/* Form */}
      <Form
        name="login_form"
        layout="vertical" // Chọn layout dạng vertical để label nằm phía trên input
        onFinish={onFinish}
        initialValues={{ remember: false }}
        style={{ width: "43%" }}
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
          <Input placeholder="Email" style={{ height: "50px" }} />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder="Password" style={{ height: "50px" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%", height: "50px" }}>
            Log in {loading && <Loading />}
          </Button>
        </Form.Item>
        <div className="login-footer">
          <NavLink to="/auth/forgot-password">Forgot your password</NavLink>
          <p>
            Don't have an account? <NavLink to="/auth/signup">Sign up</NavLink>
          </p>
        </div>
      </Form>
    </div>
  );
}
