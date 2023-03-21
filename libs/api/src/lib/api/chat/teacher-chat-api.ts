import { _http } from '../../http';
const http = _http;

export const getChatStudents = async () => {
  return new Promise<any[]>((resolve, reject) => {
    http
      .get('api/v1/chat/teachers/get_students')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
