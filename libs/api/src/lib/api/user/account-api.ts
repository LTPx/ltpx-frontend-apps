import { _http } from '../../http';
import { IUserAccount, TypeAccounts } from '../../interfaces/user-interface';

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

export const changeAccount = async (type: TypeAccounts) => {
  return new Promise<IUserAccount>((resolve, reject) => {
    http
      .post('/api/v1/user/accounts/change_to_account', type)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const registerAsTeacher = async () => {
  return new Promise<IUserAccount>((resolve, reject) => {
    http
      .post('/api/v1/user/accounts/register_as_teacher')
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




