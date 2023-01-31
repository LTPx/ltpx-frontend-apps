import { setTokenAxios, _http } from "../http";
import { ICurrentUser, IRegisterUser, UserResponse } from "../interfaces/user-interface";
const http = _http;

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

export const loginAdmin = (credentials: Credentials) => {
  const { email, password } = credentials;
  const payload = {
    user: {
      email,
      password
    }
  };
  return new Promise<IAuthSuccessResponse>((resolve, reject) => {
    http
    .post('login', payload) //TODO: validate in backend maybe another endpoint
    .then((response) => {
      const { user } = response.data;
      const { initial_register } = user;
      if(initial_register === 'admin') {
        setTokenAxios(response.headers);
      } else {
        reject({message: 'not allow'});
      }
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
      http.defaults.headers.common["Authorization"] = null;
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const getCurrentUser = async() => {
  return new Promise<ICurrentUser>((resolve, reject) => {
    http
    .get('api/v1/current_user')
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}
