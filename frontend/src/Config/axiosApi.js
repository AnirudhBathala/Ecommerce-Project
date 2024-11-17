
import axios from 'axios';


export const API_BASE_URL = 'http://localhost:8080'
const api = axios.create({
  baseURL: API_BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json', 
    
  },
});


const token = localStorage.getItem('jwt');

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
api.defaults.headers.post['Content-Type'] = 'application/json';


export default api;