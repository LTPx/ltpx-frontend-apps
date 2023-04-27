import { _http } from '../../http';
import { IUserAccount } from '../../interfaces/user-interface';

const http = _http;

export const updateAccount = async (userParams: IUserAccount) => {
  return new Promise<IUserAccount>((resolve, reject) => {
    http
      .put('/api/v1/user/accounts', userParams)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setTokenDevice = async (token: string) => {
  return new Promise<IUserAccount>((resolve, reject) => {
    http
      .post('/api/v1/user/accounts/set_device_token', { token_device: token})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



