import {
  applyToTeach,
  createCourse,
  ApplyTeachApiParams,
  IRegisterUser,
  ITeacher,
  registerTeacher,
  StatusTeacherAccount,
  TypeViews,
  UserResponse,
  CourseApiParams,
  ApplicationTeach,
  getApplicationTeach,
  IUserAccount,
  getTeacherProfile,
  updateTeacherProfile,
  QuizModel,
  editCourse,
  NewAchievementParams,
  TeacherCourse,
  getTeacherCourse,
  createQuiz,
  createAchievement,
  sendCourseToReview,
  getWallet,
  WalletModel,
  getTeacherClassesMonth,
  MeetingDate,
  getTeacherCourses,
} from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';

type TResponseApply = {
  accepted: boolean;
  data: ITeacher | any;
};

type TResponseLogin = {
  isLogin: boolean;
  data: UserResponse | any;
};

type TResponseCreateCourse = {
  success: boolean;
  data: CourseApiParams | any;
};

type TResponseGetApplication = {
  ok: boolean;
  data: ApplicationTeach | any;
};

type TResponseProfile = {
  ok: boolean;
  data: IUserAccount | any;
};

type TResponseUpdateProfile = {
  success: boolean;
  data: IUserAccount | any;
};

type TResponse = {
  success: boolean;
  data?: any;
  error?: Error;
};

export type TeacherSlice = {
  loadingTeacherApi: boolean;
  teacher_account: StatusTeacherAccount;
  application: ApplicationTeach | null;
  profile: IUserAccount | null;
  newQuiz: QuizModel | null;
  currentCourse: TeacherCourse;
  wallet: WalletModel;
  meetings: MeetingDate[];
  applyTeach: (params: ApplyTeachApiParams) => Promise<any>;
  getApplicationTeach: () => Promise<any>;
  registerTeacher: (params: IRegisterUser) => Promise<TResponseLogin>;
  createCourse: (params: CourseApiParams) => Promise<TResponseCreateCourse>;
  editCourse: (params: CourseApiParams) => Promise<TResponseCreateCourse>;
  getProfile: () => Promise<TResponseProfile>;
  updateProfile: (params: IUserAccount) => Promise<TResponseUpdateProfile>;
  createQuiz: (params: any) => Promise<TResponse>;
  createAchievement: (params: NewAchievementParams) => Promise<TResponse>;
  getCourse: (id: number) => Promise<TResponse>;
  _sendCourseToReview: (id: number) => Promise<TResponse>;
  _getWallet: () => Promise<TResponse>;
  _getClassrooms: () => Promise<TResponse>;
  _getCourses: () => Promise<TResponse>;
};

export const createTeacherSlice: StateCreator<
  StoreState,
  [],
  [],
  TeacherSlice
> = (set, get) => ({
  loadingTeacherApi: false,
  teacher_account: StatusTeacherAccount.unapplied,
  application: null,
  profile: null,
  newQuiz: null,
  currentCourse: {} as TeacherCourse,
  wallet: {} as WalletModel,
  meetings: [],
  applyTeach: async (params: ApplyTeachApiParams): Promise<TResponseApply> => {
    try {
      const application = await applyToTeach(params);
      set({
        teacher_account: StatusTeacherAccount.review,
        application: application,
      });
      return { accepted: true, data: application };
    } catch (error) {
      return { accepted: false, data: error };
    }
  },
  getApplicationTeach: async (): Promise<TResponseGetApplication> => {
    try {
      const response = await getApplicationTeach();
      set({ application: response });
      return { ok: true, data: response };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
  getProfile: async (): Promise<TResponseGetApplication> => {
    try {
      const response = await getTeacherProfile();
      set({ profile: response });
      return { ok: true, data: response };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
  registerTeacher: async (params: IRegisterUser): Promise<TResponseLogin> => {
    try {
      const user = await registerTeacher(params);
      set({
        user: user,
        isAuthenticated: true,
        currentView: TypeViews.teacher,
      });
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  createCourse: async (
    params: CourseApiParams
  ): Promise<TResponseCreateCourse> => {
    try {
      const course = await createCourse(params);
      return { success: true, data: course };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  editCourse: async (
    params: CourseApiParams
  ): Promise<TResponseCreateCourse> => {
    try {
      const course = await editCourse(params);
      set({currentCourse: course})
      return { success: true, data: course };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  updateProfile: async (
    params: IUserAccount
  ): Promise<TResponseUpdateProfile> => {
    try {
      const response = await updateTeacherProfile(params);
      set({ profile: response });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  createQuiz: async (params) => {
    try {
      const quiz = await createQuiz(params);
      const course = get().currentCourse;
      const allQuizzes = course.quizzes || [];
      const quizzes = allQuizzes.concat([quiz]);
      const courseUpdated = { ...course, ...{quizzes}}
      set({ currentCourse: courseUpdated });
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  createAchievement: async (params) => {
    try {
      const achievement = await createAchievement(params);
      const course = get().currentCourse;
      const allAchievements = course.achievements || [];
      const achievements = allAchievements.concat([achievement]);
      const courseUpdated = { ...course, ...{achievements}}
      set({ currentCourse: courseUpdated });
      return { success: true, data: achievement };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  getCourse: async (id: number) => {
    try {
      const course = await getTeacherCourse(id);
      set({ currentCourse: course });
      return { success: true, data: course };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _sendCourseToReview: async (id:number) => {
    try {
      const course = await sendCourseToReview(id);
      return { success: true, data: course };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _getWallet: async () => {
    try {
      const wallet = await getWallet();
      set({wallet});
      return { success: true, data: wallet };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _getClassrooms: async () => {
    try {
      const classrooms = await getTeacherClassesMonth();
      return { success: true, data: classrooms };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _getCourses: async () => {
    return callApi(getTeacherCourses, set);
  },
});

const callApi = async (promiseFn: any, set: any):Promise<TResponse> => {
  set({loadingTeacherApi: true});
  try {
    const response = await promiseFn();
    set({loadingTeacherApi: false});
    return { success: true, data: response };
  } catch (error) {
    set({loadingTeacherApi: false});
    return { success: false, data: error };
  }
}
