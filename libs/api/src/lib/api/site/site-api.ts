import { _http } from '../../http';
import { CourseSite } from '../../interfaces/course-interface';

const http = _http;

export const getPopularCategories = async () => {
  return new Promise<any[]>((resolve, reject) => {
    http
      .get('api/v1/site/categories')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCoursesByCategory = async (slug: string) => {
  return new Promise<CourseSite[]>((resolve, reject) => {
    http
      .get('api/v1/site/courses', { params: { category: slug } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
