import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  ICourse,
  ICredentials,
  IRegisterUser,
  loginUser,
  logout,
  registerTeacher,
  registerUser,
  getCurrentUser,
  UserResponse,
  TypeViews
} from '@ltpx-frontend-apps/api';

type UserBasic = {
  email: string;
  fullname: string;
  initial_register: string;
};

type TResponseLogin = {
  isLogin: boolean;
  data: UserResponse | any;
};

export type UserSlice = {
  user: UserBasic;
  isAuthenticated: boolean;
  cart: {
    courses: ICourse[];
  };
  currentView: TypeViews,
  getCurrentUser: () => Promise<TResponseLogin>;
  login: (credentials: ICredentials) => Promise<TResponseLogin>;
  register: (params: IRegisterUser) => Promise<TResponseLogin>;
  registerTeacher: (params: IRegisterUser) => Promise<TResponseLogin>;
  logout: () => void;
  addCourseCart: (course: ICourse) => void;
  removeCourseCart: (id: string) => void;
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
    initial_register: ''
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
        currentView: views[initial_register]
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
  registerTeacher: async (params: IRegisterUser):Promise<TResponseLogin> => {
    try {
      const { user } = await registerTeacher(params);
      set({
        user: user,
        isAuthenticated: true,
        currentView: TypeViews.teacher
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
  addCourseCart: (course: ICourse) =>
    set((state) => ({
      cart: {
        courses: state.cart.courses.concat([course]),
      },
    })),
  removeCourseCart: (id: string) =>
    set((state) => ({
      cart: {
        courses: state.cart.courses.filter((course) => course.id !== id),
      },
    })),
});
