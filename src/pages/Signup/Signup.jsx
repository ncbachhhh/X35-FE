import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import ButtonUI from "../../components/ui/ButtonUI/ButtonUI.jsx";
import "./Signup.css";
import { useNotification } from "../../contexts/notification.context.js";
import UserAPI from "../../APIs/user.api.js";
import Loading from "../../components/ui/Loading/Loading.jsx";

export default function Signup() {
  const { api } = useNotification();
  const [loading, setLoading] = useState(false);

  // Hàm xử lý khi người dùng submit form
  const onFinish = async (values) => {
    setLoading(true);
    const response = await UserAPI.register(values);

    setLoading(false);
    if (response.isSuccess) {
      // Đăng ký thành công
      api.success({
        message: "Register successful",
        description: response.message,
        duration: 1.5,
      });

      // Chuyển hướng
      window.location.href = "/auth/login";
    } else {
      // Đăng ký thất bại, hiển thị thông báo lỗi

      api.error({
        message: "Register failed",
        description: response.message,
        duration: 1.5,
      });
    }
  };
  return (
    <div className="signup-container">
      <h1 className="signup-header">SignUp</h1>
      <Form name="signup_form" layout="vertical" onFinish={onFinish} style={{ width: "80%", display: "flex", gap: "20px" }}>
        <div style={{ width: "100%" }}>
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              { required: true, message: "Please input your fullname!" },
              { min: 8, message: "Fullname must be at least 8 characters!" },
            ]}
          >
            <Input placeholder="Fullname" style={{ height: "50px" }} />
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
              Sign Up {loading && <Loading />}
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
