import axios from 'axios';
import { getApiUrl } from "./api";

const API = getApiUrl();

export const createInstance = ( apiUrl: string, key: string) => {
  const auth_token = localStorage.getItem(key);
  if (auth_token) {
    axios.defaults.headers.common["Authorization"] = auth_token;
  }
  return axios.create({ baseURL: apiUrl });
}

export const setTokenAxios = (headers: any, key: string) => {
  if ( headers.authorization ) {
    const { authorization } = headers;
    _http.defaults.headers.common["Authorization"] = authorization;
    localStorage.setItem(key, authorization);
  }
}

export const _http = createInstance(API, 'auth_token');
