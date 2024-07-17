import { create } from 'apisauce';

const baseURL = 'http://13.209.27.220:8080';

export const API = create({
    baseURL,
    withCredentials: true,
});
