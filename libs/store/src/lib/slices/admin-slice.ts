import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  getPendingApplications,
  ApplicationTeach,
  getApplication,
  approveApplication,
  approvedApplications,
  getUsers,
  getPendingReviewCourses,
  CourseModel,
  adminGetCourse,
  adminApproveCourse,
  getApprovedCourses,
  getWithdrawalsByStatus,
  getWithdrawal,
  approveWithdrawal,
  getUser,
  rejectApplication,
  getApplicationsByStatus,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type AdminSlice = {
  applications: ApplicationTeach[];
  courses: CourseModel[];
  viewCourse: CourseModel;
  viewApplication: ApplicationTeach;
  getApplicationStore: (id: number) => void;
  getCourseStore: (id: number) => void;
  _pendingApplications: () => Promise<TResponse>;
  _approvedApplications: () => Promise<TResponse>;
  _rejectApplication: (id: number, comment: string) => Promise<TResponse>;
  _getApplication: (id: number) => void;
  _approveApplication: (id: number) => Promise<TResponse>;
  _getUsers: () => Promise<TResponse>;
  _getUser: (userId: number) => Promise<TResponse>;
  _getPendingReviewCourses: () => Promise<TResponse>;
  _getCourse: (id: number) => void;
  _approveCourse: (id: number) => Promise<TResponse>;
  _getApprovedCourses: () => Promise<TResponse>;
  _getWithdrawalsByStatus: (status: string) => Promise<TResponse>;
  _getWithdrawal: (id: number) => Promise<TResponse>;
  _approveWithdrawal: (id: number, params: {receipt_id?: string, receipt_image: string}) => Promise<TResponse>;
  _getApplicationsByStatus: (status: string) => Promise<TResponse>;
};

export const createAdminSlice: StateCreator<StoreState, [], [], AdminSlice> = (
  set,
  get
) => ({
  applications: [],
  courses: [],
  viewApplication: {} as ApplicationTeach,
  viewCourse: {} as CourseModel,
  getApplicationStore: (id: number) => {
    const applications = get().applications || [];
    const application =
      applications.find((application) => application.id === id) ||
      ({} as ApplicationTeach);
    set({ viewApplication: application });
  },
  getCourseStore: (id) => {
    const courses = get().courses || [];
    const course =
      courses.find((course) => course.id === id) || ({} as CourseModel);
    set({ viewCourse: course });
  },
  _pendingApplications: async () => {
    try {
      const applications = await getPendingApplications();
      set({ applications });
      return { success: true, data: applications };
    } catch (error) {
      return { success: false, error };
    }
  },
  _approvedApplications: async () => {
    try {
      const applications = await approvedApplications();
      set({ applications });
      return { success: true, data: applications };
    } catch (error) {
      return { success: false, error };
    }
  },
  _rejectApplication: async (id, comment) => {
    try {
      const application = await rejectApplication(id, comment);
      return { success: true, data: application };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getApplication: async (id) => {
    try {
      const application = await getApplication(id);
      set({ viewApplication: application });
      return { success: true, data: application };
    } catch (error) {
      return { success: false, error };
    }
  },
  _approveApplication: async (id) => {
    try {
      const application = await approveApplication(id);
      return { success: true, data: application };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getUsers: async () => {
    try {
      const users = await getUsers();
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getPendingReviewCourses: async () => {
    try {
      const courses = await getPendingReviewCourses();
      set({ courses });
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getCourse: async (id) => {
    try {
      const course = await adminGetCourse(id);
      set({ viewCourse: course });
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getUser: async (id) => {
    try {
      const user = await getUser(id);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error };
    }
  },
  _approveCourse: async (id) => {
    try {
      const course = await adminApproveCourse(id);
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getApprovedCourses: async () => {
    try {
      const courses = await getApprovedCourses();
      set({ courses });
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getWithdrawalsByStatus: async (status) => {
    try {
      const withdrawals = await getWithdrawalsByStatus(status);
      return { success: true, data: withdrawals };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getWithdrawal: async (id) => {
    try {
      const withdrawal = await getWithdrawal(id);
      return { success: true, data: withdrawal };
    } catch (error) {
      return { success: false, error };
    }
  },
  _approveWithdrawal: async (id, params) => {
    try {
      const withdrawal = await approveWithdrawal(id, params);
      return { success: true, data: withdrawal };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getApplicationsByStatus: async (status) => {
    try {
      const applications = await getApplicationsByStatus(status);
      set({ applications });
      return { success: true, data: applications };
    } catch (error) {
      return { success: false, error };
    }
  },
});
