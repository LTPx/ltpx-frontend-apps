import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createTeacherSlice, TeacherSlice } from './teacher/teacher-slice';
import { createUserSlice, UserSlice } from './user/user-slice';

export type StoreState = TeacherSlice & UserSlice;

//  export const useAppStore = create<StoreState>()(
//     devtools((...a) => {
//       return {
//         ...createUserSlice(...a),
//         ...createTeacherSlice(...a),
//       };
//     })
//   );
export const useAppStore = create<StoreState>()(
  devtools((...a) => {
    return {
      ...createUserSlice(...a),
      ...createTeacherSlice(...a),
    };
  })
);
