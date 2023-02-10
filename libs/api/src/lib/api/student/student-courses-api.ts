import { _http } from '../../http';
import { CourseModel } from '../../interfaces/course-interface';

const http = _http;

export const getStudentCourses = async () => {
  return new Promise<CourseModel[]>((resolve, reject) => {
    http
      .get('api/v1/student/courses')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
