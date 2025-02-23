import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


export const fetchData = async (url, method, data = null, headers = {}) => {
  try {
    const config = {
      method,
      url: apiUrl + url,
      headers,
      data,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
