import axios from 'axios';

let apiUrl = '';
let keyLocalStorage = '';

export const setAxiosConfig = ( apiUrl: string, key: string) => {
  apiUrl = apiUrl;
  keyLocalStorage = key;
}

export const createInstance = () => {
  // console.log('apiUrl: ', apiUrl);
  // console.log('key: ', key);
  // const auth_token = localStorage.getItem(key);
  // if (auth_token) {
  //   axios.defaults.headers.common["Authorization"] = auth_token;
  // }
  console.log('apiUrl: ', apiUrl);
  return axios.create({ baseURL: apiUrl });
}

export const setTokenAxios = (headers: any) => {
  if ( headers.authorization ) {
    const { authorization } = headers;
    _http.defaults.headers.common["Authorization"] = authorization;
    localStorage.setItem(keyLocalStorage, authorization);
  }
}

export const _http = createInstance();
