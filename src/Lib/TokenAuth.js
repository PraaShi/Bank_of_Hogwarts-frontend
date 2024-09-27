import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://localhost:7135/api/', // Adjust the base URL as needed
});

// Add a request interceptor
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken'); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;
