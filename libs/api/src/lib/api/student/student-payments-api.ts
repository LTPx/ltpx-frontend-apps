import { _http } from '../../http';
import { Purchase } from '../../interfaces/user-course-payment-interface';

const http = _http;

export const getStudentPayments = async () => {
  return new Promise<Purchase[]>((resolve, reject) => {
    http
      .get('api/v1/student/payments')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
