import axios from 'axios';
import { LOCAL_API_URL } from "./api";

export const createInstance = ( api_url: string ) => {
  console.log('calling');
  const auth_token = localStorage.getItem("auth_token");
  if (auth_token) {
    axios.defaults.headers.common["Authorization"] = auth_token;
  }
  return axios.create({ baseURL: api_url });
}

export const setTokenAxios = (headers: any) => {
  if ( headers.authorization ){
    const { authorization } = headers;
    _http.defaults.headers.common["Authorization"] = authorization;
    sessionStorage.setItem("auth_token", authorization);
  }
}

export const _http = createInstance(LOCAL_API_URL);


