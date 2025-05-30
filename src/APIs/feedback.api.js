import { DOMAIN } from "../CONSTANTS.js";
import axios from "axios";
import authorizedAxios from "../helpers/authorizedAxios.js";

const URL = `${DOMAIN}/api/feedback`;

const API_URL = {
  ADD_FEEDBACK: `${URL}/create`,
  GET_FEEDBACK: `${URL}/car`,
};

const FeedbackAPI = {
  addFeedback: async (data) => {
    try {
      const response = await authorizedAxios().post(API_URL.ADD_FEEDBACK, data);
      return {
        isSuccess: true,
        message: "Feedback added successfully",
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to add feedback",
      };
    }
  },
  getFeedback: async (carId) => {
    try {
      const response = await axios.get(`${API_URL.GET_FEEDBACK}/${carId}`);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message || "Feedback retrieved successfully",
      }
    } catch (error) {
      return {
        isSuccess: false,
        message: error.response?.data?.message || "Failed to retrieve feedback",
      }
    }
  }
};

export default FeedbackAPI;
