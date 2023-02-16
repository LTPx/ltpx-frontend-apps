import { _http } from '../../http';
import { EditSessionParams, NewSessionParams, SessionModel } from '../../interfaces/session-interface';

const http = _http;

export const createSession = async (quiz: NewSessionParams) => {
  return new Promise<SessionModel>((resolve, reject) => {
    http
      .post('api/v1/teacher/course_sessions', quiz)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editSession = async (session: EditSessionParams) => {
  const { id } = session;
  return new Promise<SessionModel>((resolve, reject) => {
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

export const removeSession = async (id: number) => {
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
