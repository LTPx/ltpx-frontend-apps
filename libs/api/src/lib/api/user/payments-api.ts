import { _http } from '../../http';
import {
  ConfirmUserPayment,
  NewUserCoursePaymentParams,
  UserCoursePaymentModel,
} from '../../interfaces/user-course-payment-interface';

const http = _http;

export const createPaymentOrder = async (
  payment: NewUserCoursePaymentParams
) => {
  return new Promise<UserCoursePaymentModel>((resolve, reject) => {
    http
      .post('api/v1/site/user_payments', payment)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updatePaymentOrder = async (payment: ConfirmUserPayment) => {
  return new Promise<UserCoursePaymentModel>((resolve, reject) => {
    http
      .post(`api/v1/site/user_payments/${payment.order_id}/register_payment`, payment)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const cancelPaymentOrder = async (id: number) => {
  return new Promise<UserCoursePaymentModel>((resolve, reject) => {
    http
      .delete(`api/v1/site/user_payments/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
