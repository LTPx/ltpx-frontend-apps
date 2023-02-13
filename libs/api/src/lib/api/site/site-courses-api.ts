import { _http } from '../../http';
import { CourseModel, FullCourse } from '../../interfaces/course-interface';

const http = _http;

export const getPopularCourses = async () => {
  return new Promise<CourseModel[]>((resolve, reject) => {
    http
      .get('api/v1/site/courses/popular_courses')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const siteGetCourse = async (courseId: number) => {
  return new Promise<FullCourse>((resolve, reject) => {
    http
      .get(`api/v1/site/courses/${courseId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
