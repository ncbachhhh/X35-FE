import React from "react";
import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import ButtonUI from "../../components/ui/ButtonUI/ButtonUI.jsx";
import "./Signup.css";

export default function Signup() {
  // Hàm xử lý khi người dùng submit form
  const onFinish = (values) => {
    console.log("Received values:", values);
  };
  return (
    <div className="signup-container">
      <h1 className="signup-header">SignUp</h1>
      <Form name="signup_form" layout="vertical" onFinish={onFinish} style={{ width: "80%", display: "flex", gap: "20px" }}>
        <div style={{ width: "100%" }}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 8, message: "Username must be at least 8 characters!" },
            ]}
          >
            <Input placeholder="Username" style={{ height: "50px" }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Email" style={{ height: "50px" }} />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please input your address!" }]}>
            <Input placeholder="Address" style={{ height: "50px" }} />
          </Form.Item>
        </div>

        <div style={{ width: "100%" }}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message: "Password must contain at least 1 uppercase letter, 1 number, and 1 special character!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" style={{ height: "50px" }} />
          </Form.Item>
          <Form.Item
            label="Re-Password"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords that you entered do not match!");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-Password" style={{ height: "50px" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%", height: "50px", marginTop: "30px" }}>
              Sign Up
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="signup-footer">
        <p>
          Already have an account? <NavLink to="/auth/login">Log in</NavLink>
        </p>
      </div>
    </div>
  );
}
