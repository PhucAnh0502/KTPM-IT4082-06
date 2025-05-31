import axios from 'axios';

const API_URL = import.meta.env.VITE_API_PATH;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a separate instance for unauthenticated requests
const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Account APIs
export const accountApi = {
  login: (data) => api.post('/accounts/login', data),
  register: (data) => api.post('/accounts/create', data),
  changePassword: (data) => api.post('/accounts/change-password', data),
  updateAccount: (id, data) => api.put(`/accounts/${id}`, data),
  deleteAccount: (id) => api.delete(`/accounts/${id}`),
  resetPassword: (data) => publicApi.post('/accounts/forget-password', data),
  getAllAccounts: () => api.get('/accounts/get-all'),
};

// Resident APIs
export const residentApi = {
  createResident: (data) => api.post('/residents/create', data),
  getResident: (id) => api.get(`/residents/${id}`),
  updateResident: (id, data) => api.put(`/residents/${id}`, data),
  deleteResident: (id) => api.delete(`/residents/${id}`),
  getAllResidents: () => api.get('/residents/get-alls'),
};

// Household APIs
export const householdApi = {
  createHousehold: (data) => api.post('/households/create', data),
  getHousehold: (id) => api.get(`/households/${id}`),
  updateHousehold: (id, data) => api.put(`/households/${id}`, data),
  deleteHousehold: (id) => api.delete(`/households/${id}`),
  getAllHouseholds: () => api.get('/households/get-all'),
};

// Fee APIs
export const feeApi = {
  createFee: (data) => api.post('/fees/create', data),
  getFee: (id) => api.get(`/fees/${id}`),
  updateFee: (id, data) => api.put(`/fees/${id}`, data),
  deleteFee: (id) => api.delete(`/fees/${id}`),
  getAllFees: () => api.get('/fees/get-alls'),
};

// Fee Collection APIs
export const feeCollectionApi = {
  createFeeCollection: (data) => api.post('/fee-collections/create', data),
  getFeeCollection: (id) => api.get(`/fee-collections/${id}`),
  updateFeeCollection: (id, data) => api.put(`/fee-collections/${id}`, data),
  deleteFeeCollection: (id) => api.delete(`/fee-collections/${id}`),
  getAllFeeCollections: () => api.get('/fee-collections/get-all'),
};

// Payment APIs
export const paymentApi = {
  createPayment: (data) => api.post('/pay-fees/create', data),
  getPayment: (id) => api.get(`/pay-fees/${id}`),
  updatePayment: (id, data) => api.put(`/pay-fees/${id}`, data),
  deletePayment: (id) => api.delete(`/pay-fees/${id}`),
  getAllPayments: () => api.get('/pay-fees/get-alls'),
};

// Vehicle APIs
export const vehicleApi = {
  createVehicle: (data) => api.post('/vehicles/create', data),
  getVehicle: (id) => api.get(`/vehicles/${id}`),
  updateVehicle: (id, data) => api.put(`/vehicles/${id}`, data),
  deleteVehicle: (id) => api.delete(`/vehicles/${id}`),
  getAllVehicles: () => api.get('/vehicles/get-all'),
};

export default api; 