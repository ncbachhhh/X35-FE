import React, { useContext, useState } from "react";
import "./ForgotPassword.css";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/notification.context.js";

export default function ForgotPassword() {
  const { api } = useNotification();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const navigate = useNavigate();

  const sendVerificationCode = (values) => {
    const fakeCode = "123456"; // Giả lập mã xác minh gửi email
    setEmail(values.email);
    setSentCode(fakeCode);
    api.success({ message: "Thành công", description: `Mã xác minh đã được gửi đến email: ${values.email}` });
    setStep(2);
  };

  const verifyCode = (values) => {
    if (values.code === sentCode) {
      api.success({ message: "Thành công", description: "Xác minh thành công!" });
      navigate("/abc");
    } else {
      api.error({ message: "Thất bại", description: "Mã xác minh không chính xác!" });
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h1 className="forgot-password-title">Forgot password</h1>
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
                Gửi mã xác minh
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 2 && (
          <Form onFinish={verifyCode}>
            <Form.Item>
              <Input value={email} disabled size="large" />
            </Form.Item>
            <Form.Item name="code" rules={[{ required: true, message: "Vui lòng nhập mã xác minh!" }]}>
              <Input placeholder="Nhập mã xác minh" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Xác minh
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
