import { _http } from '../../http';
import { AchievementsStudentResponse } from '../../interfaces/achievement-interface';

const http = _http;

export const getStudentAchievements = async (courseId: number) => {
  return new Promise<AchievementsStudentResponse>((resolve, reject) => {
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
