import React from "react";
import "./Login.css";
import { Button, Checkbox, Input, Form } from "antd";
import ButtonUI from "../../components/ui/ButtonUI/ButtonUI.jsx";
import { NavLink } from "react-router-dom";

export default function Login() {
  // Hàm xử lý khi người dùng submit form
  const onFinish = (values) => {
    console.log("Received values:", values);
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
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input placeholder="Username" style={{ height: "50px" }} />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder="Password" style={{ height: "50px" }} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%", height: "50px" }}>
            Log in
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
