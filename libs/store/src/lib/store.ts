import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { AdminSlice, createAdminSlice } from './slices/admin-slice';
import { CartSlice, createCartSlice } from './slices/cart-slice';
import { CourseSlice, createCourseSlice } from './slices/course-slice';
import { createSiteSlice, SiteSlice } from './slices/site-slice';
import { createStudentSlice, StudentSlice } from './slices/student-slice';
import { createTeacherSlice, TeacherSlice } from './slices/teacher-slice';
import { createUserSlice, UserSlice } from './slices/user-slice';
import { createCourseStudentsSlice, CourseStudentsSlice } from './slices/course-students-slice';

export type StoreState = TeacherSlice &
  UserSlice &
  CourseSlice &
  AdminSlice &
  SiteSlice &
  CartSlice &
  StudentSlice &
  CourseStudentsSlice;

export const useAppStore = create<StoreState>()(
  devtools((...a) => {
    return {
      ...createUserSlice(...a),
      ...createTeacherSlice(...a),
      ...createCourseSlice(...a),
      ...createAdminSlice(...a),
      ...createSiteSlice(...a),
      ...createCartSlice(...a),
      ...createStudentSlice(...a),
      ...createCourseStudentsSlice(...a),
    };
  })
);
