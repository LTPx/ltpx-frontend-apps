import { _http } from '../../http';
import { NewUserCoursePaymentParams, UserCoursePaymentModel } from '../../interfaces/user-course-payment-interface';

const http = _http;

export const registerPaymentCourse = async (payment: NewUserCoursePaymentParams) => {
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
