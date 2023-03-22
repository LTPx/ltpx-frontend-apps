import { _http } from '../../http';
import { TeacherProfile } from '../../interfaces/teacher-interface';

const http = _http;

export const getPublicTeacherProfile = async (slug: string) => {
  return new Promise<TeacherProfile>((resolve, reject) => {
    http
      .get(`api/v1/site/teacher_profiles/${slug}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
