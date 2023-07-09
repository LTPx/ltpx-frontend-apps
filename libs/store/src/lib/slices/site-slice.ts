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
  TeacherSummary,
  getPublicTeacherProfile,
  CourseSite,
  CourseSessionSummary,
  FormatResponse,
  getPopularCategories,
  getCoursesByCategory,
  CategoryModel,
  formatErrors,
  getCertificate,
} from '@ltpx-frontend-apps/api';

export type SiteSlice = {
  currentFullCourse: FullCourse;
  categories: CategoryModel[];
  categoriesForSelect: {
    text: string;
    value: string;
  }[];
  _getPopularCourses: () => Promise<FormatResponse>;
  _getSiteCourse: (slug: string) => Promise<FormatResponse>;
  _createPaymentOrder: (params: NewUserCoursePaymentParams) => Promise<FormatResponse>;
  _confirmUserPayment: (params: ConfirmUserPayment) => Promise<FormatResponse>;
  _cancelUserPayment: (orderId: number) => Promise<FormatResponse>;
  _getTeacherProfile: (slug: string) => Promise<FormatResponse>;
  _getPopularCategories: () => Promise<FormatResponse>;
  _getCoursesByCategory: (categorySlug: string) => Promise<FormatResponse>;
  _getCertificate: (slug: string, id: number) => Promise<FormatResponse>;
};

export const createSiteSlice: StateCreator<StoreState, [], [], SiteSlice> = (
  set,
  get
) => ({
  currentFullCourse: {
    course: {} as CourseSite,
    teacher: {} as TeacherSummary,
    session: {} as CourseSessionSummary,
    comments: [],
    ratings: []
  } as FullCourse,
  categories: [],
  categoriesForSelect: [],
  _getPopularCourses: async () => {
    try {
      const courses = await getPopularCourses();
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getSiteCourse: async (slug) => {
    try {
      const course = await siteGetCourse(slug);
      set({ currentFullCourse: course })
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error };
    }
  },
  _createPaymentOrder: async (params) => {
    try {
      const payment = await createPaymentOrder(params);
      return { success: true, data: payment };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _confirmUserPayment: async (params) => {
    try {
      const payment = await updatePaymentOrder(params);
      return { success: true, data: payment };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _cancelUserPayment: async (id) => {
    try {
      const payment = await cancelPaymentOrder(id);
      return { success: true, data: payment };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getTeacherProfile: async (slug) => {
    try {
      const teacher = await getPublicTeacherProfile(slug);
      return { success: true, data: teacher}
    } catch (error) {
      return { success: false, error}
    }
  },
  _getPopularCategories: async () => {
    try {
      const categories = await getPopularCategories();
      const categoriesForSelect = categories.map((category)=>{
        return {
          text: category.name,
          value: category.slug
        }
      })
      set({categories, categoriesForSelect });
      return { success: true, data: categories}
    } catch (error) {
      return { success: false, error}
    }
  },
  _getCoursesByCategory: async (categorySlug) => {
    try {
      const courses = await getCoursesByCategory(categorySlug);
      return { success: true, data: courses}
    } catch (error) {
      return { success: false, error}
    }
  },
  _getCertificate: async (slug, number) => {
    try {
      const certificate = await getCertificate(slug, number);
      return { success: true, data: certificate}
    } catch (error) {
      return { success: false, error}
    }
  },
});
