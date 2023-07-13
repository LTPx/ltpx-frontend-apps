import { _http } from '../../http';
import { TeacherProfile } from '../../interfaces/teacher-interface';
const http = _http;

export const getTeachers = async () => {
  return new Promise<TeacherProfile[]>((resolve, reject) => {
    http
      .get('api/v1/admin/teachers')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTeacher = async (teacherId: number) => {
  return new Promise<TeacherProfile>((resolve, reject) => {
    http
      .get(`api/v1/admin/teacher/${teacherId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
