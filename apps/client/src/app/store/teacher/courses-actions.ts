import { createQuiz, getTeacherQuizzes, NewQuizApiParams } from "@ltpx-frontend-apps/api";

type TResponse = {
  success: boolean;
  response: SuccessResponse | ErrorResponse;
};

type SuccessResponse = {
  data: any;
};

type ErrorResponse = {
  error: any;
};

export const teacherNewQuiz = async (params: NewQuizApiParams, set: any):Promise<TResponse> => {
  try {
    const quiz = await createQuiz(params);
    set({ newQuiz: quiz });
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

export const teacherQuizzes = async (set: any):Promise<TResponse> => {
  try {
    const quizzes = await getTeacherQuizzes();
    return {
      success: true,
      response: {
        data: quizzes
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
