import { setTokenAxios, _http } from "../http";

const http = _http;

export const loginUser = async(email: string, password: string) => {
  const response = await http.post('login', {
    user: {
      email,
      password
    }
  });
  setTokenAxios(response.headers);
  return response.data;
}

export const registerUser = async(email: string, password: string) => {
  const response = await http.post('register', {
    user: {
      email,
      password
    }
  });
  setTokenAxios(response.headers);
  return response.data;
}

export const logout  = async() => {
  const response = await http.delete('logout');
  localStorage.removeItem("auth_token");
  http.defaults.headers.common["Authorization"] = null;
  return response.data;
}
