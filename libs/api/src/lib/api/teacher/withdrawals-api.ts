import { _http } from '../../http';
import { WithdrawalModel, WithdrawalParams } from '../../interfaces/withdrawals-interfaces';

const http = _http;

export const makeWithdrawal = async (params: WithdrawalParams) => {
  return new Promise<WithdrawalModel>((resolve, reject) => {
    http
      .post('api/v1/teacher/withdrawals', params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
