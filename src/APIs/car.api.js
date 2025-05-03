import { DOMAIN } from "../CONSTANTS.js";
import axios from "axios";
import authorizedAxios from "../helpers/authorizedAxios.js";

const URL = `${DOMAIN}/api`;

const API_URL = {
  CREATE_CAR: `${URL}/car/create`,
  GET_CAR: `${URL}/car/detail`,
  GET_CAR_LISTING: `${URL}/car/list`,
  LIKE_CAR: `${URL}/car/like`,
  GET_BRAND: `${URL}/car-brand/list`,
  GET_TYPE: `${URL}/car-type/list`,
  GET_GEARBOX: `${URL}/car-gearbox/list`,
  GET_CAR_RECOMMEND: `${URL}/car/recommend-by-liked`,
};

const CarAPI = {
  createCar: async (data) => {
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

      const response = await axios.post(API_URL.CREATE_CAR, formData, {
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
  getCar: async (id) => {
    try {
      const response = await axios.get(`${API_URL.GET_CAR}?id=${id}`);
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
  getCarRecommend: async (limit) => {
    try {
      const response = await authorizedAxios().post(API_URL.GET_CAR_RECOMMEND, {limit: limit});
      
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
