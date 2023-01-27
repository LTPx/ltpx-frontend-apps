import {
  CourseModel,
  createQuiz,
  getTeacherCourse,
  getTeacherQuizzes,
  NewQuizApiParams,
} from '@ltpx-frontend-apps/api';

export const teacherNewQuiz = async (params: NewQuizApiParams, set: any) => {
  try {
    const quiz = await createQuiz(params);
    set({ newQuiz: quiz });
    return {
      success: true,
      response: {
        data: quiz,
      },
    };
  } catch (error) {
    return {
      success: false,
      response: {
        error: error,
      },
    };
  }
};

export const teacherQuizzes = async (set: any) => {
  try {
    const quizzes = await getTeacherQuizzes();
    return {
      success: true,
      response: {
        data: quizzes,
      },
    };
  } catch (error) {
    return {
      success: false,
      response: {
        error: error,
      },
    };
  }
};

export const teacherGetCourse = async (id: number) => {
  try {
    const course = await getTeacherCourse(id);
    return {
      success: true,
      response: {
        data: course as CourseModel,
      },
    };
  } catch (error) {
    return {
      success: false,
      response: {
        error: error,
      },
    };
  }
};
