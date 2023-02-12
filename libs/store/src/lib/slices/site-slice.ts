import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  getPopularCourses,
  NewUserCoursePaymentParams,
  createPaymentOrder,
  siteGetCourse,
  updatePaymentOrder,
  ConfirmUserPayment,
  cancelPaymentOrder,
  FullCourse,
  CourseModel,
  TeacherSummary,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type SiteSlice = {
  currentFullCourse: FullCourse;
  _getPopularCourses: () => Promise<TResponse>;
  _getSiteCourse: (id: number) => Promise<TResponse>;
  _createPaymentOrder: (params: NewUserCoursePaymentParams) => Promise<TResponse>;
  _confirmUserPayment: (params: ConfirmUserPayment) => Promise<TResponse>;
  _cancelUserPayment: (orderId: number) => Promise<TResponse>;
};

export const createSiteSlice: StateCreator<StoreState, [], [], SiteSlice> = (
  set,
  get
) => ({
  currentFullCourse: {
    course: {} as CourseModel,
    teacher: {} as TeacherSummary,
    comments: [],
    ratings: []
  } as FullCourse,
  _getPopularCourses: async (): Promise<TResponse> => {
    try {
      const courses = await getPopularCourses();
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getSiteCourse: async (id): Promise<TResponse> => {
    try {
      const course = await siteGetCourse(id);
      set({ currentFullCourse: course })
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error };
    }
  },
  _createPaymentOrder: async (params): Promise<TResponse> => {
    try {
      const payment = await createPaymentOrder(params);
      return { success: true, data: payment };
    } catch (error) {
      return { success: false, error };
    }
  },
  _confirmUserPayment: async (params): Promise<TResponse> => {
    try {
      const payment = await updatePaymentOrder(params);
      return { success: true, data: payment };
    } catch (error) {
      return { success: false, error };
    }
  },
  _cancelUserPayment: async (id): Promise<TResponse> => {
    try {
      const payment = await cancelPaymentOrder(id);
      return { success: true, data: payment };
    } catch (error) {
      return { success: false, error };
    }
  },
});
