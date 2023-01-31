import { _http } from '../../http';
import { ApplicationTeach } from '../../interfaces/teacher-interface';

const http = _http;

export const getPendingApplications = async () => {
  return new Promise<ApplicationTeach[]>((resolve, reject) => {
    http
      .get('api/v1/admin/application_teachers/pending')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
