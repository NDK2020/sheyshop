import axios from "axios";

export const axiosInstance = axios.create({
  //baseURL : "https://practice-sheyshop.herokuapp.com/"
  baseURL : "http://localhost:8000"
})
