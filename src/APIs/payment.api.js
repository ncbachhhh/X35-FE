import { DOMAIN } from "../CONSTANTS.js";
import axios from "axios";
import authorizedAxios from "../helpers/authorizedAxios.js";

const URL = `${DOMAIN}/api/payment`;

const API_URL = {
  CREATE_PAYMENT: `${URL}/create-payment`,
};

const PaymentAPI = {
  createPayment: async (data) => {
    try {
      const response = await axios.post(API_URL.CREATE_PAYMENT, data);
      return {
        isSuccess: true,
        paymentUrl: response.data.paymentUrl,
        qrCode: response.data.qrCode,
      };
    } catch (error) {
      return {
        isSuccess: false,
      };
    }
  },
};

export default PaymentAPI;