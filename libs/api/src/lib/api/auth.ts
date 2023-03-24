import { getApiUrl } from "@ltpx-frontend-apps/api";
import { setTokenAxios, createInstance } from "../http";
import { ICurrentUser, IRegisterUser } from "../interfaces/user-interface";

const localKey = "token_opm"
const API = getApiUrl();
const http = createInstance(API, localKey);

export interface Credentials {
  email: string;
  password: string;
}

export interface ChangePassword {
  current_password: string;
  confirm_password: string;
  password: string;
}

export const loginUser = (credentials: Credentials) => {
  const { email, password } = credentials;
  const payload = {
    user: {
      email,
      password
    }
  };
  return new Promise<ICurrentUser>((resolve, reject) => {
    http
    .post('login', payload)
    .then((response) => {
      setTokenAxios(response.headers, 'auth_token');
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
  return new Promise<ICurrentUser>((resolve, reject) => {
    http
    .post('login', payload) //TODO: validate in backend maybe another endpoint
    .then((response) => {
      const { initial_register } = response.data;
      if(initial_register === 'admin') {
        setTokenAxios(response.headers, localKey);
      } else {
        reject('No cuentas con los permisos necesarios');
      }
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const registerUser = async(params: IRegisterUser):Promise<ICurrentUser> => {
  const { email, password, fullname } = params;
  const payload = {
    user: {
      email,
      password,
      fullname
    }
  };
  return new Promise<ICurrentUser>((resolve, reject) => {
    http
    .post('register', payload)
    .then((response) => {
      setTokenAxios(response.headers, 'auth_token');
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
  return new Promise<ICurrentUser>((resolve, reject) => {
    http
    .post('register', payload)
    .then((response) => {
      setTokenAxios(response.headers, 'auth_token');
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


export const changePassword = async(params: ChangePassword) => {
  return new Promise<ICurrentUser>((resolve, reject) => {
    http
    .put('change_password', params)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}
