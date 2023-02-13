import { _http } from '../../http';
import { CartModel } from '../../interfaces/cart-interface';

const http = _http;

export const getCart = async () => {
  return new Promise<CartModel[]>((resolve, reject) => {
    http
      .get('api/v1/cart')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addCourseCart = async (courseId: number) => {
  return new Promise<CartModel>((resolve, reject) => {
    http
      .post('api/v1/cart/add', {course_id: courseId})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeCourseCart = async (courseId: number) => {
  return new Promise<CartModel>((resolve, reject) => {
    http
      .post('api/v1/cart/remove', {course_id: courseId})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
