import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { AdminSlice, createAdminSlice } from './slices/admin-slice';
import { CourseSlice, createCourseSlice } from './slices/course-slice';
import { createTeacherSlice, TeacherSlice } from './slices/teacher-slice';
import { createUserSlice, UserSlice } from './slices/user-slice';

export type StoreState = TeacherSlice & UserSlice & CourseSlice & AdminSlice;

export const useAppStore = create<StoreState>()(
  devtools((...a) => {
    return {
      ...createUserSlice(...a),
      ...createTeacherSlice(...a),
      ...createCourseSlice(...a),
      ...createAdminSlice(...a)
    };
  })
);
