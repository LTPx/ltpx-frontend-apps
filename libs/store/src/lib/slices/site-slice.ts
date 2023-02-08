import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  enrollUser,
  getPopularCourses,
  NewEnrollmentParams,
  siteGetCourse,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type SiteSlice = {
  _getPopularCourses: () => Promise<TResponse>;
  _getSiteCourse: (id: number) => Promise<TResponse>;
  _enrollUser: (params: NewEnrollmentParams) => Promise<TResponse>;
};

export const createSiteSlice: StateCreator<StoreState, [], [], SiteSlice> = (
  set,
  get
) => ({
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
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error };
    }
  },
  _enrollUser: async (params): Promise<TResponse> => {
    try {
      const enrollment = await enrollUser(params);
      return { success: true, data: enrollment };
    } catch (error) {
      return { success: false, error };
    }
  },
});
