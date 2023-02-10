import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  getStudentCourses,
  getStudentPayments,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type StudentSlice = {
  _getStudentPayments: () => Promise<TResponse>;
  _getStudentCourses: () => Promise<TResponse>;
};

export const createStudentSlice: StateCreator<StoreState, [], [], StudentSlice> = (
  set,
  get
) => ({
  _getStudentPayments: async (): Promise<TResponse> => {
    try {
      const payments = await getStudentPayments();
      return { success: true, data: payments };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentCourses: async (): Promise<TResponse> => {
    try {
      const courses = await getStudentCourses();
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error };
    }
  },
});
