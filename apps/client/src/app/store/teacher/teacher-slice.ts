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
  NewQuizApiParams,
  editCourse,
  NewAchievementParams,
  TeacherCourse,
  getTeacherCourse,
  createQuiz,
} from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { teacherNewAchievement } from './achievements-actions';
import { teacherNewQuiz, teacherQuizzes } from './courses-actions';

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
  teacher_account: StatusTeacherAccount;
  application: ApplicationTeach | null;
  profile: IUserAccount | null;
  newQuiz: QuizModel;
  currentCourse: TeacherCourse;
  applyTeach: (params: ApplyTeachApiParams) => Promise<any>;
  getApplicationTeach: () => Promise<any>;
  registerTeacher: (params: IRegisterUser) => Promise<TResponseLogin>;
  createCourse: (params: CourseApiParams) => Promise<TResponseCreateCourse>;
  editCourse: (params: CourseApiParams) => Promise<TResponseCreateCourse>;
  getProfile: () => Promise<TResponseProfile>;
  updateProfile: (params: IUserAccount) => Promise<TResponseUpdateProfile>;
  createQuiz: (params: NewQuizApiParams) => Promise<TResponse>;
  myQuizzes: () => Promise<TResponse>;
  createAchievement: (params: NewAchievementParams) => Promise<TResponse>;
  getCourse: (id: number) => Promise<TResponse>;
};

export const createTeacherSlice: StateCreator<
  StoreState,
  [],
  [],
  TeacherSlice
> = (set, get) => ({
  teacher_account: StatusTeacherAccount.unapplied,
  application: null,
  profile: null,
  newQuiz: {} as QuizModel,
  currentCourse: {} as TeacherCourse,
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
      const { user } = await registerTeacher(params);
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
  myQuizzes: async () => {
    const { success, response } = await teacherQuizzes(set);
    return { success: success, data: response };
  },
  createAchievement: async (params) => {
    const { success, response } = await teacherNewAchievement(params, set);
    return { success: success, data: response };
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
});
