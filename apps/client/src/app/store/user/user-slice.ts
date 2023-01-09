import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  PublicCourse,
  ICredentials,
  IRegisterUser,
  loginUser,
  logout,
  registerUser,
  getCurrentUser,
  UserResponse,
  TypeViews,
  UserStore,
  TypeAccounts
} from '@ltpx-frontend-apps/api';

type TResponseLogin = {
  isLogin: boolean;
  data: UserResponse | any;
};

export type UserSlice = {
  user: UserStore;
  isAuthenticated: boolean;
  cart: {
    courses: PublicCourse[];
  };
  currentView: TypeViews,
  getCurrentUser: () => Promise<TResponseLogin>;
  login: (credentials: ICredentials) => Promise<TResponseLogin>;
  register: (params: IRegisterUser) => Promise<TResponseLogin>;
  logout: () => void;
  addCourseCart: (course: PublicCourse) => void;
  removeCourseCart: (id: number) => void;
};

const views = {
  user: TypeViews.default,
  teacher: TypeViews.teacher,
  student: TypeViews.student,
  admin: TypeViews.default,
}

export const createUserSlice: StateCreator<
  StoreState,
  [],
  [],
  UserSlice
> = (set, get) => ({
  user: {
    fullname: '',
    email: '',
    initial_register: TypeAccounts.user
  },
  isAuthenticated: false,
  cart: {
    courses: [],
  },
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
      sessionStorage.removeItem('auth_token');
      return { isLogin: false, data: error };
    }
  },
  login: async (credentials: ICredentials):Promise<TResponseLogin> => {
    try {
      const { user } = await loginUser(credentials);
      set({
        user: user,
        isAuthenticated: true,
        currentView: views[user.initial_register]
      });
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
    } catch (error) {
      console.log(error);
    }
  },
  addCourseCart: (course: PublicCourse) =>
    set((state) => ({
      cart: {
        courses: state.cart.courses.concat([course]),
      },
    })),
  removeCourseCart: (id: number) =>
    set((state) => ({
      cart: {
        courses: state.cart.courses.filter((course) => course.id !== id),
      },
    })),
});
