import { AxiosResponse } from 'axios'; // Axios types import karna zaroori hai
import { CreateUserData, Credentials, GateApiUrl, OrderStatus, Tenant, User } from '../types';
import { api } from './client';

// Auth Service
export const login = (credential: Credentials) => api.post(`${GateApiUrl.AUTH_SERVICE}/auth/login`, credential);
export const self = () => api.get(`${GateApiUrl.AUTH_SERVICE}/auth/self`);
export const logout = () => api.post(`${GateApiUrl.AUTH_SERVICE}/auth/logout`);
export const getUsers = (queryString: string) => api.get(`${GateApiUrl.AUTH_SERVICE}/users?${queryString}`);
export const createUser = (user: User) => api.post(`${GateApiUrl.AUTH_SERVICE}/users`, user);
export const updateUser = (user: CreateUserData, id: number) =>
    api.patch(`${GateApiUrl.AUTH_SERVICE}/users/${id}`, user);
export const getTenants = (queryString?: string) => api.get(`${GateApiUrl.AUTH_SERVICE}/tenants?${queryString}`);
export const createTenant = (tenant: Tenant) => api.post(`${GateApiUrl.AUTH_SERVICE}/tenants`, tenant);
export const updateTenant = (tenant: Tenant, id: number) =>
    api.patch(`${GateApiUrl.AUTH_SERVICE}/tenants/${id}`, tenant);

// Catalog Service
// Categoried Section
export const getCategories = () => api.get(`${GateApiUrl.AUTH_SERVICE}/categories`);
export const getCategory = (categoryId: string) => api.get(`${GateApiUrl.AUTH_SERVICE}/categories/${categoryId}`);
export const getProducts = (queryParams: string) => api.get(`${GateApiUrl.AUTH_SERVICE}/products?${queryParams}`);
export const createProduct = (product: FormData) =>
    api.post(`${GateApiUrl.AUTH_SERVICE}/products`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateProduct = (product: FormData, id: string) =>
    api.put(`${GateApiUrl.AUTH_SERVICE}/products/${id}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const getToppings = (queryParams?: string) => api.get(`${GateApiUrl.AUTH_SERVICE}/toppings?${queryParams}`);

export const createTopping = (topping: FormData) =>
    api.post(`${GateApiUrl.AUTH_SERVICE}/toppings`, topping, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateTopping = (topping: FormData, id: string) =>
    api.put(`${GateApiUrl.AUTH_SERVICE}/toppings/${id}`, topping, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

// Order Serive
export const getOrders = (queryString: string) => api.get(`${GateApiUrl.ORDER_SERVICE}/orders?${queryString}`);
export const getSingleOrder = (orderId: string, queryString: string) =>
    api.get(`${GateApiUrl.ORDER_SERVICE}/orders/${orderId}?${queryString}`);

export const changeStatus = (orderId: string, data: { status: OrderStatus }) =>
    api.patch(`${GateApiUrl.ORDER_SERVICE}/orders/change-status/${orderId}`, data);
