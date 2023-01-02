import { Course, Credentials, loginUser, UserResponse } from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';

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
    courses: Course[];
  };
  login: (credentials: Credentials) => Promise<TResponseLogin>;
  setUser: (user: UserBasic) => void;
  logoutApp: () => void;
  addCourseCart: (course: Course) => void;
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
  login: async (credentials: Credentials):Promise<TResponseLogin> => {
    try {
      const { user } = await loginUser(credentials);
      set({ user: user, isAuthenticated: true });
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  setUser: () => set((state) => ({
    user: state.user, isAuthenticated: true
  })),
  logoutApp: () =>
    set((state) => ({ isAuthenticated: !state.isAuthenticated })),
  addCourseCart: (course: Course) =>
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
