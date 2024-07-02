import { Credentials } from '../types';
import { api } from './client';

const login = (credential: Credentials) => api.post('/auth/login', credential);

export { login };
