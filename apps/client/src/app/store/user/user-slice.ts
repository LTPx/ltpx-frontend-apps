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
  UserResponse
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
  login: (credentials: ICredentials) => Promise<TResponseLogin>;
  register: (params: IRegisterUser) => Promise<TResponseLogin>;
  registerTeacher: (params: IRegisterUser) => Promise<TResponseLogin>;
  logout: () => void;
  addCourseCart: (course: ICourse) => void;
  removeCourseCart: (id: string) => void;
};

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
  login: async (credentials: ICredentials):Promise<TResponseLogin> => {
    try {
      const { user } = await loginUser(credentials);
      set({ user: user, isAuthenticated: true });
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  register: async (params: IRegisterUser):Promise<TResponseLogin> => {
    try {
      const { user } = await registerUser(params);
      set({ user: user, isAuthenticated: true });
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  registerTeacher: async (params: IRegisterUser):Promise<TResponseLogin> => {
    try {
      const { user } = await registerTeacher(params);
      set({ user: user, isAuthenticated: true });
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
