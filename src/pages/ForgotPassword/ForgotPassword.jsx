import React, { useContext, useState } from "react";
import "./ForgotPassword.css";
import { Form, Input, Button, message, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/notification.context.js";
import UserAPI from "../../APIs/user.api.js";
import Loading from "../../components/ui/Loading/Loading.jsx";

export default function ForgotPassword() {
  const { api } = useNotification();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onChange = (text) => {
    
  };

  const onInput = (value) => {
    setOtp(value.join(""));
  };

  const sharedProps = {
    onChange,
    onInput,
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
                Gửi mã xác minh {loading ? <Loading /> : ""}
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 2 && (
          <Form
            onFinish={(values) => {
              // Gộp dữ liệu OTP từ OTPInput vào giá trị form khi submit
              const formData = { ...values, code: otp };
              verifyCodeAndChangePassword(formData);
            }}
          >
            <Form.Item>
              <Input value={email} disabled size="large" />
            </Form.Item>

            <Form.Item name="code" rules={[{ required: true, message: "Vui lòng nhập mã xác minh!" }]}>
              <Input.OTP separator={(i) => <span style={{ color: i & 1 ? "red" : "blue" }}>—</span>} {...sharedProps} />
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
