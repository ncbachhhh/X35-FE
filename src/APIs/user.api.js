import { DOMAIN } from "../CONSTANTS.js";
import axios from "axios";
import authorizedAxios from "../helpers/authorizedAxios.js";

const URL = `${DOMAIN}/api/auth`;

const API_URL = {
  LOGIN: `${URL}/user/login`,
  REGISTER: `${URL}/user/register`,
  GET_PROFILE: `${URL}/user/get-profile`,
  SEND_CODE_FORGOT_PASSWORD: `${URL}/send-code-forgot-password`,
  VERIFY_CODE_FORGOT_PASSWORD: `${URL}/verify-code-and-reset-password`,
  ADD_RECENT_CAR: `${URL}/add-recent-car`,
  GET_RECENT_CARS: `${URL}/recent-cars`,
  CHANGE_PASSWORD: `${URL}/change-password`,
  GET_RENT_HISTORY: `${URL}/rented-cars`,
  RETURN_CAR: `${URL}/return-car`,
  GET_LIKE_CARS: `${URL}/liked-cars`,
  GET_USER_LIST: `${URL}/user_list`,
  UPDATE_USER: `${URL}/update`,
  DELETE_USER: `${URL}/delete`,
  GET_NEW_USERS_BY_DATE: `${URL}/new-users-by-date`,
  GET_REVENUE_BY_MONTH: `${URL}/revenue-by-month`,
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

  changePassword: async (data) => {
    try {
      const response = await authorizedAxios().post(API_URL.CHANGE_PASSWORD, data);
      console.log(response);

      return {
        isSuccess: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.response.data.message,
      };
    }
  },

  addRecentCar: async (carId) => {
    try {
      const response = await authorizedAxios().post(API_URL.ADD_RECENT_CAR, { carId });
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (err) {
      console.error("❌ Add recent car failed:", err);
      return {
        isSuccess: false,
        data: null,
        message: err.response.data.message,
      };
    }
  },

  getRecentViewedCars: async () => {
    try {
      const response = await authorizedAxios().get(API_URL.GET_RECENT_CARS);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (err) {
      console.error("❌ Get recent cars failed:", err);
      return {
        isSuccess: false,
        data: null,
        message: err.response.data.message,
      };
    }
  },

  getRentHistory: async () => {
    try {
      const response = await authorizedAxios().get(API_URL.GET_RENT_HISTORY);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (err) {
      console.error("❌ Get rent history failed:", err);
      return {
        isSuccess: false,
        data: null,
        message: err.response.data.message,
      };
    }
  },

  returnCar: async (billId) => {
    try {
      const response = await authorizedAxios().post(`${API_URL.RETURN_CAR}`, { billId });
      return {
        isSuccess: true,
        message: response.data.message,
      };
    } catch (err) {
      console.error("❌ Return car failed:", err);
      return {
        isSuccess: false,
        message: err.response.data.message,
      };
    }
  },

  getLikeCars: async () => {
    try {
      const response = await authorizedAxios().get(API_URL.GET_LIKE_CARS);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (err) {
      console.error("❌ Get liked cars failed:", err);
      return {
        isSuccess: false,
        message: err.response.data.message,
      };
    }
  },

  getUserList: async (page, pageSize) => {
    try {
      const response = await authorizedAxios().post(API_URL.GET_USER_LIST, {
        page: page,
        limit: pageSize,
      });
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error("❌ Get user list failed:", error);
      return {
        isSuccess: false,
        data: null,
        message: error.response.data.message,
      };
    }
  },

  updateUser: async (data) => {
    try {
      const response = await authorizedAxios().post(API_URL.UPDATE_USER, data);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error("❌ Update user failed:", error);
      return {
        isSuccess: false,
        data: null,
        message: error.response.data.message,
      };
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await authorizedAxios().post(API_URL.DELETE_USER, { id });
      return {
        isSuccess: true,
        message: response.data.message,
      };
    } catch (error) {
      console.error("❌ Delete user failed:", error);
      return {
        isSuccess: false,
        message: error.response.data.message,
      };
    }
  },

  getNewUsersByDate: async (startDate, endDate) => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await authorizedAxios().get(API_URL.GET_NEW_USERS_BY_DATE, { params });

      if (response.status === 200) {
        return {
          isSuccess: true,
          data: response.data.data,
          message: response.data.message,
        };
      } else {
        return {
          isSuccess: false,
          data: null,
          message: response.data.message || "Failed to fetch user stats",
        };
      }
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        message: error.response?.data?.message || error.message || "Error fetching user stats",
      };
    }
  },

  getRevenueByMonth: async (startDate, endDate) => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await authorizedAxios().get(API_URL.GET_REVENUE_BY_MONTH, { params });

      if (response.status === 200) {
        return {
          isSuccess: true,
          data: response.data.data,
          message: response.data.message,
        };
      } else {
        return {
          isSuccess: false,
          data: null,
          message: response.data.message || "Failed to fetch revenue data",
        };
      }
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        message: error.response?.data?.message || error.message || "Error fetching revenue data",
      };
    }
  },
};

export default UserAPI;
