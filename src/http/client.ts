import axios from 'axios';
import { useAuthStore } from '../store';

// Need to setup api gateway

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEN_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const catalogApi = axios.create({
    baseURL: import.meta.env.VITE_CATALOG_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const orderApi = axios.create({
    baseURL: import.meta.env.VITE_ORDER_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const refreshToken = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEN_API_URL}/auth/refresh`, {}, { withCredentials: true });
};
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._isRetry) {
            try {
                originalRequest._isRetry = true;
                const headers = { ...originalRequest.headers };
                await refreshToken();
                return api.request({ ...originalRequest, headers });
            } catch (err) {
                useAuthStore.getState().logout();
                return Promise.reject(err);
            }
        }
        return Promise.reject;
    }
);
