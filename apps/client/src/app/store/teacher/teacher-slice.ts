import { StateCreator } from "zustand";
import { StoreState } from "../store";

export type TeacherSlice = {
  applied_teach: boolean;
  status_account: string;
}

export const createTeacherSlice:
  StateCreator <StoreState,
  [],
  [],
  TeacherSlice > = (set) => ({
    applied_teach: false,
    status_account: '',
})
