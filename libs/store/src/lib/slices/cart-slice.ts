import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { addCourseCart, CourseModel, getCart } from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type CartSlice = {
  coursesInCart: CourseModel[];
  _addCourseCart: (course: CourseModel) => Promise<TResponse>;
  _removeCourseCart: (id: number) => Promise<TResponse>;
  _getCart: () => Promise<TResponse>;
  getTotal: () => number;
};

export const createCartSlice: StateCreator<StoreState, [], [], CartSlice> = (
  set,
  get
) => ({
  coursesInCart: [],
  getTotal: () => {
    const courses = get().coursesInCart;
    return courses.reduce((total, course) => total + course.price_cents, 0);
  },
  _getCart: async () => {
    try {
      const cart = await getCart();
      return { success: true, data: cart }
    } catch (error) {
      return { success: false, error }
    }
  },
  _addCourseCart: async (course: CourseModel) => {
    try {
      const cart = await addCourseCart(course.id);
      const coursesInCart = get().coursesInCart.concat([course]);
      set({ coursesInCart });
      return { success: true, data: cart }
    } catch (error) {
      return { success: false, error }
    }
  },
  _removeCourseCart: async (id: number) => {
    try {
      const cart = await getCart();
      const coursesInCart = get().coursesInCart.filter(
        (course) => course.id !== id
      );
      set({ coursesInCart });
      return { success: true, data: cart }
    } catch (error) {
      return { success: false, error }
    }
  },
});
