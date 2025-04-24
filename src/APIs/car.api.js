import { DOMAIN } from "../CONSTANTS.js";
import axios from "axios";

const API_URL = {
  CREATE_RENT: `${DOMAIN}/create/car`,
  GET_BRAND: `${DOMAIN}/get/car_brand`,
  GET_TYPE: `${DOMAIN}/get/car_type`,
  GET_GEARBOX: `${DOMAIN}/get/car_gearbox`,
  GET_CAR_LISTING: `${DOMAIN}/get/cars`,
  LIKE_CAR: `${DOMAIN}/like/car`,
};

const CarAPI = {
  createRent: async (data) => {
    try {
      const formData = new FormData();

      for (const key in data) {
        if (key !== "image") {
          formData.append(key, data[key]);
        }
      }

      data.image.forEach((file) => {
        formData.append("image", file.originFileObj);
      });

      const response = await axios.post(API_URL.CREATE_RENT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
  getBrand: async () => {
    try {
      const response = await axios.get(API_URL.GET_BRAND);
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
  getType: async () => {
    try {
      const response = await axios.get(API_URL.GET_TYPE);
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
  getGearbox: async () => {
    try {
      const response = await axios.get(API_URL.GET_GEARBOX);
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
  getCarListing: async (data) => {
    try {
      const response = await axios.post(API_URL.GET_CAR_LISTING, data);
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
  likeCar: async (data) => {
    try {
      const response = await axios.post(API_URL.LIKE_CAR, data);
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

};

export default CarAPI;
