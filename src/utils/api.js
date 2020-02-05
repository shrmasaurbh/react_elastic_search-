import axios from 'axios';
import {APP_URL,CORE_API_URL} from "./constants";

export default axios.create({
  baseURL: CORE_API_URL
});

// axios.interceptors.request.use(config => {
//   // log a message before any HTTP request is sent
//   console.log('Request was sent');

//   return config;
// });
