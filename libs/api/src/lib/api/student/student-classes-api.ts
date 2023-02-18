import { _http } from '../../http';
import { Classroom } from '../../interfaces/course-interface';

const http = _http;

export const getStudentClasses = async () => {
  return new Promise<Classroom[]>((resolve, reject) => {
    http
      .get('api/v1/student/classes')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
