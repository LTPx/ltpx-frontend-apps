import axios from 'axios';
import { getApiUrl } from "./api";

const API = getApiUrl();

export const createInstance = ( api_url: string ) => {
  if (typeof localStorage !== 'undefined') {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) {
      axios.defaults.headers.common["Authorization"] = auth_token;
    }
  }
  return axios.create({ baseURL: api_url });
}

export const setTokenAxios = (headers: any) => {
  if ( headers.authorization && typeof localStorage !== 'undefined') {
    const { authorization } = headers;
    _http.defaults.headers.common["Authorization"] = authorization;
    localStorage.setItem("auth_token", authorization);
  }
}

export const _http = createInstance(API);
