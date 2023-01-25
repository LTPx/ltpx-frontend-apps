import { AchievementModel, createAchievement, NewAchievementParams } from "@ltpx-frontend-apps/api";

type TResponse = {
  success: boolean;
  response: SuccessResponse | ErrorResponse;
};

type SuccessResponse = {
  data: AchievementModel;
};

type ErrorResponse = {
  error: any;
};

export const teacherNewAchievement = async (params: NewAchievementParams, set: any):Promise<TResponse> => {
  try {
    const quiz = await createAchievement(params);
    // set({ newQuiz: quiz });
    return {
      success: true,
      response: {
        data: quiz
      },
    }
  } catch (error) {
    return {
      success: false,
      response: {
        error: error
      },
    }
  }
}
