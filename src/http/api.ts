import { Credentials } from '../types';
import { api } from './client';

export const login = (credential: Credentials) =>
    api.post('/auth/login', credential);

export const self = () => api.get('/auth/self');
