import { _http } from '../../http';
import { ClassroomClasses } from '../../interfaces/course-interface';

const http = _http;

export const getTeacherClassesMonth = async () => {
  return new Promise<ClassroomClasses[]>((resolve, reject) => {
    http
      .get('api/v1/teacher/classes/current_month')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
