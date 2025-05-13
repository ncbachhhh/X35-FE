import { DOMAIN } from "../CONSTANTS.js";
import axios from "axios";
import authorizedAxios from "../helpers/authorizedAxios.js";

const URL = `${DOMAIN}/api/feedback`;

const API_URL = {
  ADD_FEEDBACK: `${URL}/create`,
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
};

export default FeedbackAPI;
