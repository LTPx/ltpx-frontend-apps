import { _http } from '../../http';

const http = _http;

export const getStudentStatists = async () => {
  return new Promise<any>((resolve, reject) => {
    http
      .get('api/v1/student/statists')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
