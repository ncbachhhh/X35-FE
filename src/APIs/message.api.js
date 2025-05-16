// APIs/message.api.js
import { DOMAIN } from "../CONSTANTS.js";
import authorizedAxios from "../helpers/authorizedAxios.js";

const MESSAGE_API_BASE = `${DOMAIN}/api/messages`;

const MessageAPI = {
  getChatHistory: async (userId) => {
    try {
      const response = await authorizedAxios().get(`${MESSAGE_API_BASE}/history/${userId}`);
      if (response.data.isSuccess) {
        return {
          isSuccess: true,
          messages: response.data.data.messages,
        };
      }
      return {
        isSuccess: false,
        message: response.data.message || "Failed to fetch chat history",
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.response?.data?.message || error.message || "Error fetching chat history",
      };
    }
  },

  sendMessageToUser: async ({ toUserId, message }) => {
    try {
      console.log("API gửi");
      const response = await authorizedAxios().post(`${MESSAGE_API_BASE}/send`, { toUserId, message });
      if (response.data.isSuccess) {
        return {
          isSuccess: true,
          message: response.data.message,
        };
      }
      return {
        isSuccess: false,
        message: response.data.message || "Failed to send message",
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.response?.data?.message || error.message || "Error sending message",
      };
    }
  },
};

export default MessageAPI;