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
} from '@ltpx-frontend-apps/api';

export type UserSlice = {
  user: UserStore;
  isAuthenticated: boolean;
  currentView: TypeViews;
  notifications: NotificationModel[];
  totalUnreadNotifications: number;
  newNotification: boolean;
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
      const { initial_view, cart } = user;
      if (cart) {
        const coursesInCart = cart.items.map((item) => item.course);
        set({
          user: user,
          isAuthenticated: true,
          currentView: initial_view,
          teacher_account: user.teacher_account,
          coursesInCart: coursesInCart,
        });
      } else {
        set({
          user: user,
          isAuthenticated: true,
          currentView: initial_view,
          teacher_account: user.teacher_account,
        });
      }
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
      const user = await registerUser(params);
      const view = user.initial_view;
      set({
        user: user,
        isAuthenticated: true,
        currentView: view,
      });
      return { success: true, data: user };
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
      set({ notifications, totalUnreadNotifications: 0 });
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
});
