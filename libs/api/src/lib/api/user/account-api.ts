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
