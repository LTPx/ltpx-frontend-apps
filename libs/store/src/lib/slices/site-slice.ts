import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  getPopularCourses, siteGetCourse,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type SiteSlice = {
  _getPopularCourses: () => Promise<TResponse>;
  _getSiteCourse: (id: number) => Promise<TResponse>;
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
  _getSiteCourse: async (id: number): Promise<TResponse> => {
    try {
      const course = await siteGetCourse(id);
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error };
    }
  },
});
