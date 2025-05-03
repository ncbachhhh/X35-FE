import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNotification } from "../../contexts/notification.context";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../APIs/user.api";
// bạn có thể đổi tên nếu cần

export default function ChangePassword() {
  const { api } = useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changePassword = async (values) => {
    const response = await UserAPI.changePassword(values);
    if (!response.isSuccess) {
      api.error({ message: "Lỗi", description: response.message, duration: 1.5 });
      return;
    }
    api.success({ message: "Thành công", description: response.message, duration: 1.5 });
  };

  const onFinish = async (values) => {
    setLoading(true);
    const response = await changePassword(values);
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <p className="comeback" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Quay lại
        </p>
        <h1 className="forgot-password-title">Change Password</h1>

        <Form onFinish={onFinish}>
          <Form.Item normalize={(value) => value?.trim()} name="oldPassword" rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}>
            <Input.Password placeholder="Mật khẩu hiện tại" size="large" />
          </Form.Item>

          <Form.Item normalize={(value) => value?.trim()} name="newPassword" rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}>
            <Input.Password placeholder="Mật khẩu mới" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
