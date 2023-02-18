import { _http } from '../../http';
import { EnrollmentModel, NewEnrollmentParams } from '../../interfaces/enrollment-interface';

const http = _http;

export const enrollUser = async (enrollment: NewEnrollmentParams) => {
  return new Promise<EnrollmentModel[]>((resolve, reject) => {
    http
      .post('api/v1/site/enrollments', enrollment)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
