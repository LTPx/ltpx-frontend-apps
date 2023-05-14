import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  ICredentials,
  IRegisterUser,
  loginUser,
  logout,
  registerUser,
  getCurrentUser,
  TypeViews,
  UserStore,
  loginAdmin,
  FormatResponse,
  formatErrors,
  ChangePasswordParams,
  changePassword,
  getNotifications,
  NotificationModel,
  IUserAccount,
  updateAccount,
  setTokenDevice,
  readNotifications,
  resetPassword,
  updateNewPassword,
} from '@ltpx-frontend-apps/api';

export type UserSlice = {
  user: UserStore;
  isAuthenticated: boolean;
  currentView: TypeViews;
  notifications: NotificationModel[];
  totalUnreadNotifications: number;
  newNotification: boolean;
  isPendingValidationAccount: boolean;
  clearUnreadNotification: () => void;
  addNotification: (notification: NotificationModel) => void;
  getCurrentUser: () => Promise<FormatResponse>;
  login: (credentials: ICredentials) => Promise<FormatResponse>;
  loginAdmin: (credentials: ICredentials) => Promise<FormatResponse>;
  register: (params: IRegisterUser) => Promise<FormatResponse>;
  logout: () => void;
  changePassword: (params: ChangePasswordParams) => Promise<FormatResponse>;
  _getNotifications: () => Promise<FormatResponse>;
  _updateAccount: (params: IUserAccount) => Promise<FormatResponse>;
  _setTokenDevice: (token: string) => Promise<FormatResponse>;
  _readNotifications: () => Promise<FormatResponse>;
  _resetPassword: (email: string) => Promise<FormatResponse>;
  _updateNewPassword: (token: string, password: string, confirmPassword: string) => Promise<FormatResponse>;
};

// const views = {
//   user: TypeViews.default,
//   teacher: TypeViews.teacher,
//   student: TypeViews.student,
//   admin: TypeViews.default,
// }
//TODO: save current view locally to avoid show 404 page on reload page
// const viewString = localStorage.getItem('view_app') || TypeViews.default;
// const currentView: TypeViews = (<any>TypeViews)[viewString];
// console.log('currentView slice: ', currentView);

export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (
  set,
  get
) => ({
  user: {} as UserStore,
  isAuthenticated: false,
  currentView: TypeViews.default,
  notifications: [],
  totalUnreadNotifications: 0,
  newNotification: false,
  isPendingValidationAccount: !!localStorage.getItem('pending-validation') || false,
  clearUnreadNotification: () => {
    set({ totalUnreadNotifications: 0, newNotification: false });
  },
  addNotification: (notification) => {
    const newNotifications = [...[notification], ...get().notifications];
    const totalUnreadNotifications = get().totalUnreadNotifications;
    set({
      notifications: newNotifications,
      totalUnreadNotifications: totalUnreadNotifications + 1,
      newNotification: true
    });
  },
  getCurrentUser: async () => {
    try {
      const user = await getCurrentUser();
      const { initial_view } = user;
      set({
        user: user,
        isAuthenticated: true,
        currentView: initial_view,
        teacher_account: user.teacher_account,
        totalUnreadNotifications: user.total_unread_notifications
      });
      return { success: true, data: user };
    } catch (error) {
      set({
        isAuthenticated: false,
        currentView: TypeViews.user,
      });
      localStorage.clear();
      return { success: false, error: formatErrors(error) };
    }
  },
  login: async (credentials) => {
    try {
      const user = await loginUser(credentials);
      set({
        user: user,
        isAuthenticated: true,
        currentView: user.initial_view,
      });
      // localStorage.setItem('view_app', view);
      localStorage.removeItem('pending-validation');
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  loginAdmin: async (credentials) => {
    try {
      const user = await loginAdmin(credentials);
      set({
        user: user,
        isAuthenticated: true,
        currentView: user.initial_view,
      });
      // localStorage.setItem('view_app', view);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  register: async (params) => {
    try {
      const response = await registerUser(params);
      localStorage.setItem('pending-validation', params.email);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  logout: async () => {
    try {
      await logout();
      localStorage.clear();
      set({ isAuthenticated: false });
    } catch (error) {
      console.log(error);
    }
  },
  changePassword: async (params) => {
    try {
      await changePassword(params);
      return { success: true };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getNotifications: async () => {
    try {
      const notifications = await getNotifications();
      set({ notifications});
      return { success: true, data: notifications };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _updateAccount: async (params) => {
    try {
      const user = await updateAccount(params);
      const userStore = { ...get().user, ...user };
      set({ user: userStore });
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _setTokenDevice: async (token) => {
    try {
      const user = await setTokenDevice(token);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _readNotifications:async () => {
    try {
      const resp = await readNotifications();
      set({user: {...get().user, ...{total_unread_notifications: 0}}})
      return { success: true, data: resp };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _resetPassword: async (email) => {
    try {
      const resp = await resetPassword(email);
      return { success: true, data: resp };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _updateNewPassword: async (email, password, confirmPassword) => {
    try {
      const resp = await updateNewPassword(email, password, confirmPassword);
      return { success: true, data: resp };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
});
