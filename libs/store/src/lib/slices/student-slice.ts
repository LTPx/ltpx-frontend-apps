import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  Classroom,
  CourseModel,
  getStudentAchievements,
  getStudentClasses,
  getStudentCourse,
  getStudentCourses,
  getStudentPayments,
  getStudentQuiz,
  getStudentQuizResult,
  getStudentQuizzes,
  getStudentTask,
  getStudentTasks,
  Purchase,
  QuizModel,
  studentEvaluateQuiz,
  UserAnswer,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type StudentSlice = {
  purchases: Purchase[];
  enrolledCourses: CourseModel[];
  enrolledCourse: CourseModel;
  studentClasses: Classroom[];
  currentQuiz: QuizModel;
  _getStudentPayments: () => Promise<TResponse>;
  _getStudentCourses: () => Promise<TResponse>;
  _getStudentCourse: (courseId: number) => Promise<TResponse>;
  _getStudentClasses: () => Promise<TResponse>;
  _getStudentQuizzes: (courseId: number) => Promise<TResponse>;
  _getStudentQuiz: (courseId: number, quizId: number) => Promise<TResponse>;
  _getStudentQuizResult: (quizResultId: number) => Promise<TResponse>;
  _evaluateQuiz: (quizId: number, answers: UserAnswer[]) => Promise<TResponse>;
  _getStudentAchievements: (courseId: number) => Promise<TResponse>;
  _getStudentTasks: (courseId: number) => Promise<TResponse>;
  _getStudentTask: (courseId: number, taskId: number) => Promise<TResponse>;
};

export const createStudentSlice: StateCreator<StoreState, [], [], StudentSlice> = (
  set,
  get
) => ({
  purchases: [],
  enrolledCourses: [],
  enrolledCourse: {} as CourseModel,
  studentClasses: [],
  currentQuiz: {} as QuizModel,
  _getStudentPayments: async (): Promise<TResponse> => {
    try {
      const purchases = await getStudentPayments();
      set({purchases});
      return { success: true, data: purchases };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentCourses: async (): Promise<TResponse> => {
    try {
      const courses = await getStudentCourses();
      set({enrolledCourses: courses});
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentCourse: async (id): Promise<TResponse> => {
    try {
      const course = await getStudentCourse(id);
      set({enrolledCourse: course});
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentClasses: async (): Promise<TResponse> => {
    try {
      const classes = await getStudentClasses();
      set({studentClasses: classes});
      return { success: true, data: classes };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentQuizzes: async (courseId): Promise<TResponse> => {
    try {
      const quizzes = await getStudentQuizzes(courseId);
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentQuiz: async (courseId, quizId): Promise<TResponse> => {
    try {
      const quiz = await getStudentQuiz(courseId, quizId);
      set({currentQuiz: quiz});
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentQuizResult: async (id): Promise<TResponse> => {
    try {
      const quiz = await getStudentQuizResult(id);
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error };
    }
  },
  _evaluateQuiz: async (id, answers): Promise<TResponse> => {
    try {
      const quiz = await studentEvaluateQuiz(id, answers);
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentAchievements: async (courseId): Promise<TResponse> => {
    try {
      const achievements = await getStudentAchievements(courseId);
      return { success: true, data: achievements };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentTasks: async (courseId): Promise<TResponse> => {
    try {
      const tasks = await getStudentTasks(courseId);
      return { success: true, data: tasks };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentTask: async (courseId, taskId): Promise<TResponse> => {
    try {
      const task = await getStudentTask(courseId, taskId);
      return { success: true, data: task };
    } catch (error) {
      return { success: false, error };
    }
  },
});
