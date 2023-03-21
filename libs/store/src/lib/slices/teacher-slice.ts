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
  getTeacherProfile,
  updateTeacherProfile,
  QuizModel,
  editCourse,
  AchievementParams,
  TeacherCourse,
  getTeacherCourse,
  createAchievement,
  sendCourseToReview,
  getWallet,
  WalletModel,
  getTeacherClassesMonth,
  MeetingDate,
  getTeacherCourses,
  getMeetingRoomId,
  validateMeetingRoomId,
  WithdrawalParams,
  makeWithdrawal,
  TeacherProfileParams,
  TeacherProfile,
  formatErrors,
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

type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type TeacherSlice = {
  loadingTeacherApi: boolean;
  teacher_account: StatusTeacherAccount;
  application: ApplicationTeach | null;
  profile: TeacherProfile;
  newQuiz: QuizModel | null;
  currentCourse: TeacherCourse;
  wallet: WalletModel;
  meetings: MeetingDate[];
  applyTeach: (params: ApplyTeachApiParams) => Promise<any>;
  getApplicationTeach: () => Promise<any>;
  registerTeacher: (params: IRegisterUser) => Promise<TResponseLogin>;
  createCourse: (params: CourseApiParams) => Promise<TResponseCreateCourse>;
  editCourse: (params: CourseApiParams) => Promise<TResponseCreateCourse>;
  createAchievement: (params: AchievementParams) => Promise<TResponse>;
  getCourse: (id: number) => Promise<TResponse>;
  _sendCourseToReview: (id: number) => Promise<TResponse>;
  _getWallet: () => Promise<TResponse>;
  _getClassrooms: () => Promise<TResponse>;
  _getCourses: () => Promise<TResponse>;
  _getMeetingRoomId: (id: number) => Promise<TResponse>;
  _validateMeetingRoomId: (id: number, roomId: string) => Promise<TResponse>;
  _makeWithdrawal: (params: WithdrawalParams) => Promise<TResponse>;
  _updateProfile: (params: TeacherProfileParams) => Promise<TResponse>;
  getProfile: () => Promise<TResponse>;
};

export const createTeacherSlice: StateCreator<
  StoreState,
  [],
  [],
  TeacherSlice
> = (set, get) => ({
  loadingTeacherApi: true,
  teacher_account: StatusTeacherAccount.unapplied,
  application: null,
  profile: {} as TeacherProfile,
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
  getProfile: async () => {
    try {
      const profile = await getTeacherProfile();
      set({ profile });
      return { success: true, data: profile };
    } catch (error) {
      return { success: false, error: error };
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
  _updateProfile: async ( params) => {
    try {
      const response = await updateTeacherProfile(params);
      set({ profile: response });
      return { success: true, data: response };
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
      return { success: false, error: formatErrors(error) };
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
      return { success: false, error: formatErrors(error) };
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
    return callApi(getTeacherClassesMonth, set);
  },
  _getCourses: async () => {
    return callApi(getTeacherCourses, set);
  },
  _getMeetingRoomId: async (id) => {
    const params = id;
    return callApi(getMeetingRoomId, set, params);
  },
  _validateMeetingRoomId: async (meetingId, roomId) => {
    try {
      const meeting = await validateMeetingRoomId(meetingId, roomId);
      return { success: true, data: meeting };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _makeWithdrawal: async (params) => {
    try {
      const withdrawal = await makeWithdrawal(params);
      return { success: true, data: withdrawal };
    } catch (error) {
      return { success: false, error: error };
    }
  },
});

const callApi = async (promiseFn: any, set: any, params?: any):Promise<TResponse> => {
  set({loadingTeacherApi: true});
  try {
    const response = await promiseFn(params);
    set({loadingTeacherApi: false});
    return { success: true, data: response };
  } catch (error) {
    set({loadingTeacherApi: false});
    return { success: false, data: error };
  }
}
