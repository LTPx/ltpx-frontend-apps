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
} from '@ltpx-frontend-apps/api';

export type UserSlice = {
  user: UserStore;
  isAuthenticated: boolean;
  currentView: TypeViews;
  getCurrentUser: () => Promise<FormatResponse>;
  login: (credentials: ICredentials) => Promise<FormatResponse>;
  loginAdmin: (credentials: ICredentials) => Promise<FormatResponse>;
  register: (params: IRegisterUser) => Promise<FormatResponse>;
  logout: () => void;
  changePassword: (params: ChangePasswordParams) => Promise<FormatResponse>;
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
  set
) => ({
  user: {} as UserStore,
  isAuthenticated: false,
  currentView: TypeViews.default,
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
  }
});
