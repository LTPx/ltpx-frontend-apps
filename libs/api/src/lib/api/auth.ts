import { setTokenAxios, _http } from "../http";
import { IRegisterUser, UserResponse } from "../interfaces/user";
const http = _http;

interface Account {
  name: string;
  email: string;
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface IAuthSuccessResponse {
  user: UserResponse;
  message: string;
}

export const loginUser = (credentials: Credentials) => {
  const { email, password } = credentials;
  const payload = {
    user: {
      email,
      password
    }
  };
  return new Promise<IAuthSuccessResponse>((resolve, reject) => {
    http
    .post('login', payload)
    .then((response) => {
      setTokenAxios(response.headers);
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const registerUser = async(params: IRegisterUser):Promise<IAuthSuccessResponse> => {
  const { email, password, fullname } = params;
  const payload = {
    user: {
      email,
      password,
      fullname
    }
  };
  return new Promise<IAuthSuccessResponse>((resolve, reject) => {
    http
    .post('register', payload)
    .then((response) => {
      setTokenAxios(response.headers);
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const registerTeacher = async (account: IRegisterUser) => {
  const { email, password, fullname } = account;
  const payload = {
    user: {
      email,
      password,
      fullname,
      initial_register: 'teacher'
    }
  };
  return new Promise<IAuthSuccessResponse>((resolve, reject) => {
    http
    .post('register', payload)
    .then((response) => {
      setTokenAxios(response.headers);
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const logout = async() => {
  return new Promise((resolve, reject) => {
    http
    .delete('logout')
    .then((response) => {
      sessionStorage.removeItem("auth_token");
      http.defaults.headers.common["Authorization"] = null;
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const getCurrentUser = async() => {
  const response = await http.get('api/v1/current_user');
  return response.data;
}
