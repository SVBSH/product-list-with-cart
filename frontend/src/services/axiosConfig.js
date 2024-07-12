import axios from 'axios';
// https://axios-http.com/docs/req_config

const request = axios.create({
    baseURL: 'http://localhost:3000', 
    timeout: 10000, 
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
export default request