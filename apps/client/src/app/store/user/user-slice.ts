import { Course, Credentials, loginUser } from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';

type UserBasic = {
  email: string;
  fullname: string;
};

export type UserSlice = {
  user: UserBasic;
  isAuthenticated: boolean;
  cart: {
    courses: Course[];
  };
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
> = (set) => ({
  user: {
    fullname: '',
    email: '',
  },
  isAuthenticated: false,
  cart: {
    courses: [],
  },
  login: async (credentials: Credentials) => {
    const { user } = await loginUser(credentials);
    set({ user: user });
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
