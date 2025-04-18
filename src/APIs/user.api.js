import { DOMAIN } from "../CONSTANTS.js";
import axios from "axios";

const API_URL = {
  LOGIN: `${DOMAIN}/auth/user/login`,
  REGISTER: `${DOMAIN}/auth/user/register`,
  GET_PROFILE: `${DOMAIN}/auth/user/get-profile`,
  SEND_CODE_FORGOT_PASSWORD: `${DOMAIN}/auth/send-code-forgot-password`,
  VERIFY_CODE_FORGOT_PASSWORD: `${DOMAIN}/auth/verify-code-and-reset-password`,
};

const UserAPI = {
  register: async (data) => {
    try {
      const response = await axios.post(API_URL.REGISTER, data);
      return {
        isSuccess: true,
        data: response.data.user,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        message: error.response.data.message,
      };
    }
  },

  login: async (data) => {
    try {
      const response = await axios.post(API_URL.LOGIN, data);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      if (response.data.data.accessToken) {
        axios.defaults.headers["Authorization"] = `Bearer ${response.data.data.accessToken}`;
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }

      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        message: error.response.data.message,
      };
    }
  },

  getProfile: async () => {
    try {
      const response = await axios.get(API_URL.GET_PROFILE);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        message: error.response.data.message,
      };
    }
  },

  sendForgotPasswordCode: async (data) => {
    try {
      const response = await axios.post(API_URL.SEND_CODE_FORGOT_PASSWORD, data);
      return {
        isSuccess: true,
        data: response.data.token,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        message: error.response.data.message,
      };
    }
  },

  verifyCodeAndChangePassword: async (data) => {
    try {
      const response = await axios.post(API_URL.VERIFY_CODE_FORGOT_PASSWORD, data);
      return {
        isSuccess: true,
        data: response.data.user,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        message: error.response.data.message,
      };
    }
  },
};

export default UserAPI;
