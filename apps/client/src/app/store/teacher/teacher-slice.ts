import { applyToTeach, createCourse, IApplyTeachFields, INewCourse, IRegisterUser, ITeacher, registerTeacher, StatusTeacherAccount, TypeViews, UserResponse } from "@ltpx-frontend-apps/api";
import { StateCreator } from "zustand";
import { StoreState } from "../store";

type TResponseApply = {
  accepted: boolean;
  data: ITeacher | any;
};

type TResponseLogin = {
  isLogin: boolean;
  data: UserResponse | any;
};

type TResponseCreateCourse = {
  data: INewCourse | any;
};

export type TeacherSlice = {
  teacher_account: StatusTeacherAccount | null;
  applyTeach: (params: IApplyTeachFields) => Promise<any>;
  registerTeacher: (params: IRegisterUser) => Promise<TResponseLogin>;
  createCourse: (params: INewCourse) => Promise<TResponseCreateCourse>;
}

export const createTeacherSlice:
  StateCreator <StoreState,
  [],
  [],
  TeacherSlice > = (set) => ({
    teacher_account: null,
    applyTeach: async (params: IApplyTeachFields):Promise<TResponseApply> => {
      try {
        const teacher = await applyToTeach(params);
        const { status_account } = teacher;
        set({ teacher_account: status_account });
        return { accepted: true, data: teacher };
      } catch (error) {
        return { accepted: false, data: error };
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
    createCourse: async (params: INewCourse):Promise<TResponseCreateCourse> => {
      debugger
      try {
        const course = await createCourse(params);
        return { data: course };
      } catch (error) {
        return { data: error };
      }
    },
  })
