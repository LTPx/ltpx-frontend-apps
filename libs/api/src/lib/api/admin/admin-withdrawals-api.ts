import { getApiUrl } from '../../api';
import { createInstance } from '../../http';
import { WithdrawalModel } from '../../interfaces/withdrawals-interfaces';
import { encapsuleInFormData } from '../../utils';

const localKey = "token_opm"
const API = getApiUrl();
const http = createInstance(API, localKey);

export const getWithdrawalsByStatus = async (status: string) => {
  return new Promise<WithdrawalModel[]>((resolve, reject) => {
    http
      .get('api/v1/admin/withdrawals/get_by_status', {params: {status: status}})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getWithdrawal = async (id: number) => {
  return new Promise<WithdrawalModel[]>((resolve, reject) => {
    http
      .get(`api/v1/admin/withdrawals/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const approveWithdrawal = async (withdrawalId: number, params: {receipt_id?: string, receipt_image: string}) => {
  const data = encapsuleInFormData(params, {mediaKeys: ['receipt_image']})
  return new Promise<WithdrawalModel[]>((resolve, reject) => {
    http
      .post(`api/v1/admin/withdrawals/${withdrawalId}/approve`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
