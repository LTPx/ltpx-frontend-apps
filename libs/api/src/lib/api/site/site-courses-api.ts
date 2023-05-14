import { _http } from '../../http';
import { CourseSite, FullCourse } from '../../interfaces/course-interface';

const http = _http;

export const getPopularCourses = async () => {
  return new Promise<CourseSite[]>((resolve, reject) => {
    http
      .get('api/v1/site/popular_courses')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const siteGetCourse = async (slug: string) => {
  return new Promise<FullCourse>((resolve, reject) => {
    http
      .get(`api/v1/site/course`, { params: { slug }})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
