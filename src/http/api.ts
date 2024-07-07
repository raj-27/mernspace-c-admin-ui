import { Credentials, User } from '../types';
import { api } from './client';

export const login = (credential: Credentials) =>
    api.post('/auth/login', credential);

export const self = () => api.get('/auth/self');
export const logout = () => api.post('/auth/logout');
export const getUsers = () => api.get('/users');
export const getTenants = () => api.get('/tenants');
export const createUser = (user: User) => api.post('/users', user);
