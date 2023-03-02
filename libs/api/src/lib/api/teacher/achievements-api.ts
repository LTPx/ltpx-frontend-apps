import { _http } from '../../http';
import { AchievementModel, AchievementParams } from '../../interfaces/achievement-interface';

const http = _http;

export const createAchievement = async (quiz: AchievementParams) => {
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

export const editAchievement = async (achievement: AchievementParams, id: number) => {
  return new Promise<AchievementModel>((resolve, reject) => {
    http
      .put(`api/v1/teacher/achievements/${id}`, achievement)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeAchievement = async (id: number) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`api/v1/teacher/achievements/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
