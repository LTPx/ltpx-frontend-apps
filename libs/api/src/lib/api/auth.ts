import { setTokenAxios, _http } from "../http";
import { UserResponse } from "../interfaces/user";
const http = _http;

interface Account {
  name: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthSuccessResponse {
  user: UserResponse;
  message: string;
}

export const loginUser = async(credentials: Credentials):Promise<AuthSuccessResponse> => {
  const { email, password } = credentials;
  const response = await http.post('login', {
    user: {
      email,
      password
    }
  });
  setTokenAxios(response.headers);
  return response.data;
}

export const registerUser = async(account: Account):Promise<AuthSuccessResponse> => {
  const { email, password, name } = account;
  const response = await http.post('register', {
    user: {
      email,
      password,
      fullname: name,
    }
  });
  setTokenAxios(response.headers);
  return response.data;
}

export const registerTeacher = async(account: Account):Promise<AuthSuccessResponse> => {
  const { email, password, name } = account;
  const response = await http.post('register', {
    user: {
      email,
      password,
      fullname: name,
      initial_register: 'teacher'
    }
  });
  setTokenAxios(response.headers);
  return response.data;
}

export const logout = async() => {
  const response = await http.delete('logout');
  localStorage.removeItem("auth_token");
  http.defaults.headers.common["Authorization"] = null;
  return response.data;
}

export const getCurrentUser = async() => {
  const response = await http.get('api/v1/current_user');
  return response.data;
}
