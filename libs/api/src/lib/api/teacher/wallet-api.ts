import { _http } from '../../http';
import { WalletModel } from '../../interfaces/wallet-interface';

const http = _http;

export const getWallet = async () => {
  return new Promise<WalletModel>((resolve, reject) => {
    http
      .get('api/v1/teacher/wallets')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
