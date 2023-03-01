import { teacherGetCourseStudents } from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';

type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type CourseStudentsSlice = {
  _getCourseStudents: (courseId: number) => Promise<TResponse>;
};

export const createCourseStudentsSlice: StateCreator<
  StoreState,
  [],
  [],
  CourseStudentsSlice
> = (set, get) => ({
  _getCourseStudents: async (courseId) => {
    try {
      const students = await teacherGetCourseStudents(courseId);
      return { success: true, data: students };
    } catch (error) {
      return { success: false, error };
    }
  },
});
