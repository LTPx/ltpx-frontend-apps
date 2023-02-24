import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  Classroom,
  CourseModel,
  getStudentClasses,
  getStudentCourse,
  getStudentCourses,
  getStudentPayments,
  getStudentQuiz,
  Purchase,
  QuizModel,
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
  _getStudentQuiz: (quizId: number) => Promise<TResponse>;
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
  _getStudentQuiz: async (id): Promise<TResponse> => {
    try {
      const quiz = await getStudentQuiz(id);
      set({currentQuiz: quiz});
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error };
    }
  },
});
