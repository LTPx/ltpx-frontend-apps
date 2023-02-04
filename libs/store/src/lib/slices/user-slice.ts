import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  ICredentials,
  IRegisterUser,
  loginUser,
  logout,
  registerUser,
  getCurrentUser,
  UserResponse,
  TypeViews,
  UserStore,
  TypeAccounts,
  loginAdmin,
} from '@ltpx-frontend-apps/api';

type TResponseLogin = {
  isLogin: boolean;
  data: UserResponse | any;
};

export type UserSlice = {
  user: UserStore;
  isAuthenticated: boolean;
  currentView: TypeViews,
  getCurrentUser: () => Promise<TResponseLogin>;
  login: (credentials: ICredentials) => Promise<TResponseLogin>;
  loginAdmin: (credentials: ICredentials) => Promise<TResponseLogin>;
  register: (params: IRegisterUser) => Promise<TResponseLogin>;
  logout: () => void;
};

const views = {
  user: TypeViews.default,
  teacher: TypeViews.teacher,
  student: TypeViews.student,
  admin: TypeViews.default,
}
//TODO: save current view locally to avoid show 404 page on reload page
// const viewString = localStorage.getItem('view_app') || TypeViews.default;
// const currentView: TypeViews = (<any>TypeViews)[viewString];
// console.log('currentView slice: ', currentView);

export const createUserSlice: StateCreator<
  StoreState,
  [],
  [],
  UserSlice
> = (set) => ({
  user: {
    fullname: '',
    email: '',
    initial_register: TypeAccounts.user
  },
  isAuthenticated: false,
  currentView: TypeViews.default,
  getCurrentUser: async ():Promise<TResponseLogin> => {
    try {
      const user = await getCurrentUser();
      const { initial_register } =  user;
      set({
        user: user,
        isAuthenticated: true,
        currentView: views[initial_register],
        teacher_account: user.teacher_account
      });
      return { isLogin: true, data: user };
    } catch (error) {
      set({
        isAuthenticated: false,
        currentView: views.user
      });
      localStorage.clear();
      return { isLogin: false, data: error };
    }
  },
  login: async (credentials: ICredentials):Promise<TResponseLogin> => {
    try {
      const { user } = await loginUser(credentials);
      const view = views[user.initial_register];
      set({
        user: user,
        isAuthenticated: true,
        currentView: view
      });
      // localStorage.setItem('view_app', view);
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  loginAdmin: async (credentials: ICredentials):Promise<TResponseLogin> => {
    try {
      const { user } = await loginAdmin(credentials);
      const view = views[user.initial_register];
      set({
        user: user,
        isAuthenticated: true,
        currentView: view
      });
      // localStorage.setItem('view_app', view);
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  register: async (params: IRegisterUser):Promise<TResponseLogin> => {
    try {
      const { user } = await registerUser(params);
      set({
        user: user,
        isAuthenticated: true,
        currentView: TypeViews.user
      });
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ isAuthenticated: false });
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },
});
