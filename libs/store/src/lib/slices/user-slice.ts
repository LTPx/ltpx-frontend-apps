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

export const createUserSlice: StateCreator<
  StoreState,
  [],
  [],
  UserSlice
> = (set) => ({
  user: {} as UserStore,
  isAuthenticated: false,
  currentView: TypeViews.default,
  getCurrentUser: async ():Promise<TResponseLogin> => {
    try {
      const user = await getCurrentUser();
      const { initial_view, cart } =  user;
      if (cart) {
        const coursesInCart = cart.items.map((item)=> item.course);
        set({
          user: user,
          isAuthenticated: true,
          currentView: initial_view,
          teacher_account: user.teacher_account,
          coursesInCart: coursesInCart
        });
      } else {
        set({
          user: user,
          isAuthenticated: true,
          currentView: initial_view,
          teacher_account: user.teacher_account,
        });
      }
      return { isLogin: true, data: user };
    } catch (error) {
      set({
        isAuthenticated: false,
        currentView: TypeViews.user
      });
      localStorage.clear();
      return { isLogin: false, data: error };
    }
  },
  login: async (credentials: ICredentials):Promise<TResponseLogin> => {
    try {
      const user = await loginUser(credentials);
      set({
        user: user,
        isAuthenticated: true,
        currentView: user.initial_view
      });
      // localStorage.setItem('view_app', view);
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  loginAdmin: async (credentials: ICredentials):Promise<TResponseLogin> => {
    try {
      const user = await loginAdmin(credentials);
      set({
        user: user,
        isAuthenticated: true,
        currentView: user.initial_view
      });
      // localStorage.setItem('view_app', view);
      return { isLogin: true, data: user };
    } catch (error) {
      return { isLogin: false, data: error };
    }
  },
  register: async (params: IRegisterUser):Promise<TResponseLogin> => {
    try {
      const user = await registerUser(params);
      const view = user.initial_view;
      set({
        user: user,
        isAuthenticated: true,
        currentView: view
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
