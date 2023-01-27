import { _http } from '../../http';
import { AchievementModel, NewAchievementParams } from '../../interfaces/achievement-interface';

const http = _http;

export const createAchievement = async (quiz: NewAchievementParams) => {
  return new Promise<AchievementModel>((resolve, reject) => {
    http
      .post('api/v1/teacher/achievements', quiz)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
