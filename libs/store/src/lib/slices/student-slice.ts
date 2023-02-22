import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  Classroom,
  CourseModel,
  getStudentClasses,
  getStudentCourse,
  getStudentCourses,
  getStudentPayments,
  Purchase,
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
  _getStudentPayments: () => Promise<TResponse>;
  _getStudentCourses: () => Promise<TResponse>;
  _getStudentCourse: (courseId: number) => Promise<TResponse>;
  _getStudentClasses: () => Promise<TResponse>;
};

export const createStudentSlice: StateCreator<StoreState, [], [], StudentSlice> = (
  set,
  get
) => ({
  purchases: [],
  enrolledCourses: [],
  enrolledCourse: {} as CourseModel,
  studentClasses: [],
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
});
