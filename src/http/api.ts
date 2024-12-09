import { AxiosResponse } from 'axios'; // Axios types import karna zaroori hai
import { CreateUserData, Credentials, Tenant, User } from '../types';
import { api, catalogApi } from './client';

export const login = (credential: Credentials): Promise<AxiosResponse<any>> =>
    api.post('/auth/login', credential);

// Users Operation
export const self = (): Promise<AxiosResponse<any>> => api.get('/auth/self');
export const logout = (): Promise<AxiosResponse<any>> =>
    api.post('/auth/logout');
export const getUsers = (queryString: string): Promise<AxiosResponse<any>> =>
    api.get(`/users?${queryString}`);
export const createUser = (user: User): Promise<AxiosResponse<any>> =>
    api.post('/users', user);
export const updateUser = (
    user: CreateUserData,
    id: number
): Promise<AxiosResponse<any>> => api.patch(`users/${id}`, user);

// Tenants Operation
export const getTenants = (queryString?: string): Promise<AxiosResponse<any>> =>
    api.get(`/tenants?${queryString}`);
export const createTenant = (tenant: Tenant): Promise<AxiosResponse<any>> =>
    api.post('/tenants', tenant);
export const updateTenant = (
    tenant: Tenant,
    id: number
): Promise<AxiosResponse<any>> => api.patch(`/tenants/${id}`, tenant);

// Catalog Service
export const getCategories = (): Promise<AxiosResponse<any>> =>
    catalogApi.get('/categories');

export const getProducts = (queryParams: string): Promise<AxiosResponse<any>> =>
    catalogApi.get(`/products?${queryParams}`);

export const createProduct = (product: FormData) =>
    catalogApi.post('/products', product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
