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
  NewCourseApiParams,
  ApplicationTeach,
  getApplicationTeach,
  IUserAccount,
  getTeacherProfile,
  updateTeacherProfile,
  QuizModel,
  NewQuizApiParams,
  createQuiz,
} from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';
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
  saved: boolean;
  data: NewCourseApiParams | any;
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
  saved: boolean;
  data: IUserAccount | any;
};

type TResponse = {
  saved: boolean;
  data?: any;
  error?: any;
};

export type TeacherSlice = {
  teacher_account: StatusTeacherAccount;
  application: ApplicationTeach | null;
  profile: IUserAccount | null;
  newQuiz: QuizModel;
  applyTeach: (params: ApplyTeachApiParams) => Promise<any>;
  getApplicationTeach: () => Promise<any>;
  registerTeacher: (params: IRegisterUser) => Promise<TResponseLogin>;
  createCourse: (params: NewCourseApiParams) => Promise<TResponseCreateCourse>;
  getProfile: () => Promise<TResponseProfile>;
  updateProfile: (params: IUserAccount) => Promise<TResponseUpdateProfile>;
  createQuiz: (params: NewQuizApiParams) => Promise<TResponse>;
  myQuizzes: () => Promise<TResponse>;
};

export const createTeacherSlice: StateCreator<
  StoreState,
  [],
  [],
  TeacherSlice
> = (set) => ({
  teacher_account: StatusTeacherAccount.unapplied,
  application: null,
  profile: null,
  newQuiz: {} as QuizModel,
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
    params: NewCourseApiParams
  ): Promise<TResponseCreateCourse> => {
    try {
      const course = await createCourse(params);
      return { saved: true, data: course };
    } catch (error) {
      return { saved: false, data: error };
    }
  },
  updateProfile: async (
    params: IUserAccount
  ): Promise<TResponseUpdateProfile> => {
    try {
      const response = await updateTeacherProfile(params);
      set({ profile: response });
      return { saved: true, data: response };
    } catch (error) {
      return { saved: false, data: error };
    }
  },
  createQuiz: async(params) => {
    const { success, response } =  await teacherNewQuiz(params, set);
    return { saved: success, data: response };
  },
  myQuizzes: async() => {
    const { success, response } =  await teacherQuizzes(set);
    return { saved: success, data: response };
  }
});
