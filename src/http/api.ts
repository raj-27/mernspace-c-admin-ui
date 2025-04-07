import { AxiosResponse } from 'axios'; // Axios types import karna zaroori hai
import { CreateUserData, Credentials, Tenant, User } from '../types';
import { api, catalogApi, orderApi } from './client';

export const login = (credential: Credentials): Promise<AxiosResponse<any>> => api.post('/auth/login', credential);

// Users Operation
export const self = (): Promise<AxiosResponse<any>> => api.get('/auth/self');
export const logout = (): Promise<AxiosResponse<any>> => api.post('/auth/logout');
export const getUsers = (queryString: string): Promise<AxiosResponse<any>> => api.get(`/users?${queryString}`);
export const createUser = (user: User): Promise<AxiosResponse<any>> => api.post('/users', user);
export const updateUser = (user: CreateUserData, id: number): Promise<AxiosResponse<any>> =>
    api.patch(`users/${id}`, user);

// Tenants Operation
export const getTenants = (queryString?: string): Promise<AxiosResponse<any>> => api.get(`/tenants?${queryString}`);
export const createTenant = (tenant: Tenant): Promise<AxiosResponse<any>> => api.post('/tenants', tenant);
export const updateTenant = (tenant: Tenant, id: number): Promise<AxiosResponse<any>> =>
    api.patch(`/tenants/${id}`, tenant);

// Catalog Service

// Category section
export const getCategories = (): Promise<AxiosResponse<any>> => catalogApi.get('/categories');

export const getCategory = (categoryId: string) => catalogApi.get(`/categories/${categoryId}`);

export const getProducts = (queryParams: string) => catalogApi.get(`/products?${queryParams}`);

// Product section
export const createProduct = (product: FormData) =>
    catalogApi.post('/products', product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateProduct = (product: FormData, id: string) =>
    catalogApi.put(`/products/${id}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

// Toppings section
export const getToppings = (queryParams?: string) => catalogApi.get(`/toppings?${queryParams}`);

export const createTopping = (topping: FormData) =>
    catalogApi.post('/toppings', topping, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateTopping = (topping: FormData, id: string) =>
    catalogApi.put(`/toppings/${id}`, topping, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

// Order Serive
export const getOrders = (queryString: string) => orderApi.get(`/orders?${queryString}`);
export const getSingleOrder = (orderId: string, queryString: string) =>
    orderApi.get(`/orders/${orderId}?${queryString}`);
