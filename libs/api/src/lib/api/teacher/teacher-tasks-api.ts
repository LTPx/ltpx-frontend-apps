import { _http } from '../../http';
import { NewTaskParams, TaskModel } from '../../interfaces/task-interface';

const http = _http;

export const createTask = async (courseId: number, params: NewTaskParams) => {
  return new Promise<TaskModel>((resolve, reject) => {
    http
      .post(`api/v1/teacher/courses/${courseId}/tasks`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editTask = async (courseId: number, params: NewTaskParams) => {
  return new Promise<TaskModel>((resolve, reject) => {
    http
      .put(`api/v1/teacher/courses/${courseId}/tasks`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeTask = async (courseId: number, taskId: number) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`api/v1/teacher/courses/${courseId}/tasks/${taskId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
