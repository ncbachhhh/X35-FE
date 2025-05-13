import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNotification } from "../../contexts/notification.context";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../APIs/user.api";

export default function ChangePassword() {
  const { api } = useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changePassword = async (values) => {
    const response = await UserAPI.changePassword(values);
    if (!response.isSuccess) {
      api.error({ message: "Error", description: response.message, duration: 1.5 });
      return;
    }
    api.success({ message: "Success", description: response.message, duration: 1.5 });
  };

  const onFinish = async (values) => {
    setLoading(true);
    await changePassword(values);
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <p className="comeback" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Go Back
        </p>
        <h1 className="forgot-password-title">Change Password</h1>

        <Form onFinish={onFinish}>
          <Form.Item
            name="oldPassword"
            normalize={(value) => value?.trim()}
            rules={[{ required: true, message: "Please enter your current password!" }]}
          >
            <Input.Password placeholder="Current password" size="large" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            normalize={(value) => value?.trim()}
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message: "Password must include at least 1 uppercase letter, 1 number, and 1 special character!",
              },
            ]}
          >
            <Input.Password placeholder="New password" size="large" />
          </Form.Item>

          <Form.Item
            name="rePassword"
            normalize={(value) => value?.trim()}
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please re-enter your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter new password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
