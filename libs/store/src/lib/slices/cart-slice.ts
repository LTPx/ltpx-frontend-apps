import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { CourseModel } from '@ltpx-frontend-apps/api';

export type CartSlice = {
  coursesInCart: CourseModel[];
  addCourseCart: (course: CourseModel) => void;
  removeCourseCart: (id: number) => void;
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
  addCourseCart: (course: CourseModel) => {
    const coursesInCart = get().coursesInCart.concat([course]);
    set({ coursesInCart });
  },
  removeCourseCart: (id: number) => {
    const coursesInCart = get().coursesInCart.filter(
      (course) => course.id !== id
    );
    set({ coursesInCart });
  },
});
