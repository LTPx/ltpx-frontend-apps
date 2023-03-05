import { _http } from '../../http';
import { AchievementModel } from '../../interfaces/achievement-interface';

const http = _http;

export const getStudentAchievements = async (courseId: number) => {
  return new Promise<AchievementModel[]>((resolve, reject) => {
    http
      .get(`/api/v1/student/courses/${courseId}/achievements`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
