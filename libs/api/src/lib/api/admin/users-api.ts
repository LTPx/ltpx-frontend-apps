import { IUserAccount, UserModel } from '../../interfaces/user-interface';
import { _http } from '../../http';
const http = _http;

export const createUser = async (user: IUserAccount) => {
  return new Promise<UserModel>((resolve, reject) => {
    http
      .post('api/v1/admin/users', user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editUser = async (user: IUserAccount) => {
  const { id } = user;
  return new Promise<UserModel>((resolve, reject) => {
    http
      .put(`api/v1/admin/users/${id}`, user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUser = async (userId: number) => {
  return new Promise<UserModel>((resolve, reject) => {
    http
      .get(`api/v1/admin/users/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUsers = async () => {
  return new Promise<UserModel[]>((resolve, reject) => {
    http
      .get('api/v1/admin/users')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

