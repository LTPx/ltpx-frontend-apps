import { _http } from '../../http';
import { CategoryModel, Category } from '../../interfaces/category-interface';

const http = _http;

export const getCategories = async () => {
  return new Promise<CategoryModel[]>((resolve, reject) => {
    http
      .get('/api/v1/admin/categories')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createCategory = async (params: Category) => {
  return new Promise<CategoryModel>((resolve, reject) => {
    http
      .post(`/api/v1/admin/categories`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeCategory = async ( categoryId: number) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`/api/v1/admin/categories/${categoryId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editCategory = async ( params: Category) => {
  return new Promise<CategoryModel>((resolve, reject) => {
    http
      .put(`/api/v1/admin/categories/${params.id}`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
