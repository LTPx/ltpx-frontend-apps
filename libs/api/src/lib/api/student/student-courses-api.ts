import { _http } from '../../http';
import { StudentCourse } from '../../interfaces/course-interface';

const http = _http;

export const getStudentCourses = async () => {
  return new Promise<StudentCourse[]>((resolve, reject) => {
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

export const getStudentCourse = async (slug: string) => {
  return new Promise<StudentCourse>((resolve, reject) => {
    http
      .get(`api/v1/student/courses/${slug}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
