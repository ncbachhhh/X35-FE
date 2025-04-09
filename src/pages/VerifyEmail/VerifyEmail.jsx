import axios from "axios";
import React, { useEffect } from "react";
import { DOMAIN } from "../../CONSTANTS";
import { useNotification } from "../../contexts/notification.context";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { duration } from "moment";

export default function VerifyEmail() {
  const { api } = useNotification();
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  const verifyEmail = async () => {
    try {
      const response = await axios.post(`${DOMAIN}/auth/verify-email`, { token });
      if (response.status === 200) {
        api.success({ message: "Verify email success", description: "You will be redirected to home page", duration: 1.5 });
      }
    } catch (error) {
      if (error.response) {
        api.error({ message: "Verify email failed", description: error.response.data.message, duration: 1.5 });
      } else {
        api.error({ message: "Verify email failed", description: "Something went wrong", duration: 1.5 });
      }
    }
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      api.error({ message: "Verify email failed", description: "Token is missing", duration: 1.5 });
    }
  }, [token]);

  return <div></div>;
}
