import axios from 'axios';
import queryString from 'query-string';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const token = localStorage.getItem('token')
const axiosClient = axios.create({
  baseURL: 'https://stg-api.nghenongviet.vn/',
  headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  throw error;
});

axiosClient.interceptors.response.use(
  (response)=>
    new Promise((resolve, reject)=>{
      resolve(response)
    }),
  (error) =>{
    if(!error.response){
      return new Promise((resolve, reject)=>{
        reject(error)
      })
    }
    if(error.response.status === 401) {
      localStorage.removeItem('token')
      location.href = '/#/login'
      location.reload()
    } else {
      return new Promise((resolve, reject)=>{
        reject(error)
      })
    }
  }
)

export default axiosClient;
