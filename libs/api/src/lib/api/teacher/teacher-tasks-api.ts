import { _http } from '../../http';
import { EditSessionParams, CourseSessionModel } from '../../interfaces/session-interface';
import { NewTaskParams, TaskModel } from '../../interfaces/task-interface';

const http = _http;

export const createTask = async (id: number, params: NewTaskParams) => {
  return new Promise<TaskModel>((resolve, reject) => {
    http
      .post(`api/v1/teacher/courses/${id}/tasks`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editTask = async (session: EditSessionParams) => {
  const { id } = session;
  return new Promise<CourseSessionModel>((resolve, reject) => {
    http
      .put(`api/v1/teacher/course_sessions/${id}`, session)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeTask = async (id: number) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`api/v1/teacher/course_sessions/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
