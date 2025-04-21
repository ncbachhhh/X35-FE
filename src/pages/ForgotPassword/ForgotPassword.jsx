import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/notification.context.js";
import UserAPI from "../../APIs/user.api.js";
import Loading from "../../components/ui/Loading/Loading.jsx";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const { api } = useNotification();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();

  const onChange = (text) => {};

  const onInput = (value) => {
    setOtp(value.join(""));
  };

  const sendVerificationCode = async (values) => {
    setLoading(true);
    const response = await UserAPI.sendForgotPasswordCode(values);
    setLoading(false);
    if (!response.isSuccess) {
      api.error({ message: "Lỗi", description: response.message, duration: 1.5 });
      return;
    }
    setEmail(values.email);
    setToken(response.data);
    api.success({ message: "Thành công", description: `Mã xác minh đã được gửi đến email: ${values.email}`, duration: 1.5 });
    setStep(2);
  };

  const resendVerificationCode = async () => {
    setLoading2(true);
    const response = await UserAPI.sendForgotPasswordCode({ email });
    setLoading2(false);
    if (!response.isSuccess) {
      api.error({ message: "Lỗi", description: response.message, duration: 1.5 });
      return;
    }
    api.success({ message: "Thành công", description: `Mã xác minh đã được gửi lại đến email: ${email}`, duration: 1.5 });
  };

  const verifyCodeAndChangePassword = async (values) => {
    values.code = otp;
    if (values.code.length !== 6) {
      api.error({ message: "Lỗi", description: "Mã xác minh không hợp lệ", duration: 1.5 });
      return;
    }
    values.token = token;

    setLoading(true);
    const response = await UserAPI.verifyCodeAndChangePassword(values);
    setLoading(false);

    if (!response.isSuccess) {
      api.error({ message: "Lỗi", description: response.message, duration: 1.5 });
      return;
    }
    api.success({ message: "Thành công", description: response.message, duration: 1.5 });
    navigate("/auth/login");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <p className="comeback" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Quay lại
        </p>
        <h1 className="forgot-password-title">Forgot password</h1>

        {/* Step 1: Nhập email và gửi mã xác minh */}
        {step === 1 && (
          <Form onFinish={sendVerificationCode}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email của bạn" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Gửi mã xác minh {loading ? <Loading /> : ""}
              </Button>
            </Form.Item>
          </Form>
        )}

        {/* Step 2: Xác minh mã OTP và thay đổi mật khẩu */}
        {step === 2 && (
          <Form
            onFinish={(values) => {
              // Gộp dữ liệu OTP từ OTPInput vào giá trị form khi submit
              const formData = { ...values, code: otp };
              verifyCodeAndChangePassword(formData);
            }}
          >
            {/* Email field - cho phép sửa email */}
            <Form.Item>
              <div style={{ display: "flex", gap: "10px" }}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Cho phép sửa email
                  size="large"
                  style={{ width: "250%" }}
                />
                <Button onClick={resendVerificationCode} type="primary" block size="large">
                  Gửi lại mã {loading2 ? <Loading /> : ""}
                </Button>
              </div>
            </Form.Item>

            <Form.Item name="code" rules={[{ required: true, message: "Vui lòng nhập mã xác minh!" }]}>
              <Input.OTP separator={(i) => <span style={{ color: i & 1 ? "red" : "blue" }}>—</span>} onChange={onChange} onInput={onInput} />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
              <Input.Password placeholder="Nhập mật khẩu" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Xác minh {loading ? <Loading /> : ""}
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
