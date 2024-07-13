import { CreateUserData, Credentials, Tenant, User } from '../types';
import { api } from './client';

export const login = (credential: Credentials) =>
    api.post('/auth/login', credential);

// Users Operation
export const self = () => api.get('/auth/self');
export const logout = () => api.post('/auth/logout');
export const getUsers = (queryString: string) =>
    api.get(`/users?${queryString}`);
export const createUser = (user: User) => api.post('/users', user);
export const updateUser = (user: CreateUserData, id: number) =>
    api.patch(`users/${id}`, user);

// Tenants Operation
export const getTenants = (queryString: string) =>
    api.get(`/tenants?${queryString}`);

export const createTenant = (tenant: Tenant) => api.post('/tenants', tenant);

export const updateTenant = (tenant: Tenant, id: number) => {
    return api.patch(`/tenants/${id}`, tenant);
};
