import { _http } from '../../http';
import { CategoryModel } from '../../interfaces/category-interface';
import { Certificate } from '../../interfaces/certificate-interface';
import { CourseSite } from '../../interfaces/course-interface';

const http = _http;

export const getPopularCategories = async () => {
  return new Promise<CategoryModel[]>((resolve, reject) => {
    http
      .get('api/v1/site/popular_categories')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllCategories = async () => {
  return new Promise<CategoryModel[]>((resolve, reject) => {
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

export const getCertificate = async (slug: string, id: number) => {
  return new Promise<Certificate>((resolve, reject) => {
    http
      .get('api/v1/site/certificate', { params: { slug, id } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
