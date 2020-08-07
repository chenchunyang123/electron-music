import axios from 'axios';

/****** 创建axios实例 ******/
const service = axios.create({
  // baseURL: process.env.BASE_URL,  // api的base_url
  baseURL: 'http://localhost:3000/', // api的base_url
  timeout: 5000, // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    //请求错误处理
    return Promise.reject(error);
  },
);

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {
    //成功请求到数据
    return response;
  },
  error => {
    //响应错误处理
    console.log('error');
    console.log(error);
    console.log(JSON.stringify(error));
    return Promise.reject(error);
  },
);

export default service;
