import { AxiosResponse } from 'axios'; // Axios types import karna zaroori hai
import { CreateUserData, Credentials, OrderStatus, Tenant, User } from '../types';
import { api } from './client';

export const AUTH_SERVICE = '/api/auth';
export const CATALOG_SERVICE = '/api/catalog';
export const ORDER_SERVICE = '/api/orders';

// Auth Service
export const login = (credential: Credentials) => api.post(`${AUTH_SERVICE}/auth/login`, credential);
export const self = () => api.get(`${AUTH_SERVICE}/auth/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);
export const getUsers = (queryString: string) => api.get(`${AUTH_SERVICE}/users?${queryString}`);
export const createUser = (user: User) => api.post(`${AUTH_SERVICE}/users`, user);
export const updateUser = (user: CreateUserData, id: number) => api.patch(`${AUTH_SERVICE}/users/${id}`, user);
export const getTenants = (queryString?: string) => api.get(`${AUTH_SERVICE}/tenants?${queryString}`);
export const createTenant = (tenant: Tenant) => api.post(`${AUTH_SERVICE}/tenants`, tenant);
export const updateTenant = (tenant: Tenant, id: number) => api.patch(`${AUTH_SERVICE}/tenants/${id}`, tenant);

// Catalog Service
// Categoried Section
export const getCategories = () => api.get(`${CATALOG_SERVICE}/categories`);
export const getCategory = (categoryId: string) => api.get(`${CATALOG_SERVICE}/categories/${categoryId}`);
export const getProducts = (queryParams: string) => api.get(`${CATALOG_SERVICE}/products?${queryParams}`);
export const createProduct = (product: FormData) =>
    api.post(`${CATALOG_SERVICE}/products`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateProduct = (product: FormData, id: string) =>
    api.put(`${CATALOG_SERVICE}/products/${id}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const getToppings = (queryParams?: string) => api.get(`${CATALOG_SERVICE}/toppings?${queryParams}`);

export const createTopping = (topping: FormData) =>
    api.post(`${CATALOG_SERVICE}/toppings`, topping, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateTopping = (topping: FormData, id: string) =>
    api.put(`${CATALOG_SERVICE}/toppings/${id}`, topping, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

// Order Serive
export const getOrders = (queryString: string) => api.get(`${ORDER_SERVICE}/orders?${queryString}`);
export const getSingleOrder = (orderId: string, queryString: string) =>
    api.get(`${ORDER_SERVICE}/orders/${orderId}?${queryString}`);

export const changeStatus = (orderId: string, data: { status: OrderStatus }) =>
    api.patch(`${ORDER_SERVICE}/orders/change-status/${orderId}`, data);
