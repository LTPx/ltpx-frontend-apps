import { setTokenAxios, _http } from "../http";
import { ICurrentUser, IRegisterUser } from "../interfaces/user-interface";
const http = _http;

export interface Credentials {
  email: string;
  password: string;
}

export interface ChangePasswordParams {
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
      const token = `token_${window.location.host}`;
      setTokenAxios(response.headers, token);
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
        const token = `token_${window.location.host}`;
        setTokenAxios(response.headers, token);
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

export const changePassword = async(params: ChangePasswordParams) => {
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

export const resetPassword = async (email: string) => {
  return new Promise<any>((resolve, reject) => {
    http
      .put('reset_password', { email })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateNewPassword = async (token: string, password: string, confirm_password: string) => {
  return new Promise<any>((resolve, reject) => {
    http
      .put('update_new_password', { token, password, confirm_password })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
