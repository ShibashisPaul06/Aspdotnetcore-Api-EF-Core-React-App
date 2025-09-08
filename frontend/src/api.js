import axios from 'axios';

const api = axios.create({ baseURL: '/api/employees' });

export const getAll = () => api.get('/');
export const create = (data) => api.post('/', data);
export const update = (id, data) => api.put(`/${id}`, data);
export const remove = (id) => api.delete(`/${id}`);
