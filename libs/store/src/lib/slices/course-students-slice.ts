import { teacherGetCourseStudents, teacherGetStudentQuizzes } from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';

type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type CourseStudentsSlice = {
  _getStudentsByCourse: (courseId: number) => Promise<TResponse>;
  _getStudentQuizzesByCourse: (courseId: number, studentId: number) => Promise<TResponse>;
};

export const createCourseStudentsSlice: StateCreator<
  StoreState,
  [],
  [],
  CourseStudentsSlice
> = (set, get) => ({
  _getStudentsByCourse: async (courseId) => {
    try {
      const students = await teacherGetCourseStudents(courseId);
      return { success: true, data: students };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentQuizzesByCourse: async (courseId, studentId) => {
    try {
      const quizzes = await teacherGetStudentQuizzes(courseId, studentId);
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error };
    }
  },
});
