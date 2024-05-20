import axios from "axios";
import KEY from "./key";
import HttpStatus from "../enums/httpStatus.enum";

const API_URL = "https://medcabinet-backend-nestjs.vercel.app/api/"
// const API_URL = "http://localhost:3002/api/"
// const baseClient = axios.create({
//   baseURL: API_URL
// })

let accessToken = "";
function setAccessToken(token:string) {
  accessToken = token;
}

const publicClient = axios.create({
  baseURL: API_URL,
  headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
  }
});

const privateClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});

const privateClientFormData = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*"
  },
});

privateClient.interceptors.request.use(async (req) => {
  if (req.headers) {
      req.headers["Authorization"] = "Bearer " + accessToken;
  }
  return req;
});

privateClientFormData.interceptors.request.use(async (req) => {
  if (req.headers) {
      req.headers["Authorization"] = "Bearer " + accessToken;
  }
  return req;
});

//response interceptors
privateClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const request = error.config;
    if (error.response.status === HttpStatus.UNAUTHORIZED) {
      // let errorMsg = error.response.data.message 
      //auto logout
      localStorage.removeItem(KEY.AUTH_KEY);
    }
    return Promise.reject(error);
  }
);
privateClientFormData.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const request = error.config;
    if (error.response.status === HttpStatus.UNAUTHORIZED) {
      // let errorMsg = error.response.data.message 
      //auto logout
      localStorage.removeItem(KEY.AUTH_KEY);
    }
    return Promise.reject(error);
  }
);
export { publicClient, privateClient, privateClientFormData, accessToken, setAccessToken };