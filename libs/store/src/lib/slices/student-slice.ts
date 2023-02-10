import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
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
  _getStudentPayments: () => Promise<TResponse>;
  _getStudentCourses: () => Promise<TResponse>;
};

export const createStudentSlice: StateCreator<StoreState, [], [], StudentSlice> = (
  set,
  get
) => ({
  purchases: [],
  _getStudentPayments: async (): Promise<TResponse> => {
    try {
      const purchases = await getStudentPayments();
      set({purchases})
      return { success: true, data: purchases };
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
