import { _http } from '../../http';

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

