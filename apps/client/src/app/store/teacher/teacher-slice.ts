import { StateCreator } from "zustand";
import { StoreState } from "../store";

export type TeacherSlice = {
  applied_teach: boolean;
  status_account: string;
}

//Middleware and their mutators reference
export const createTeacherSlice:
  StateCreator <StoreState,
  [],
  [],
  TeacherSlice > = (set) => ({
    applied_teach: false,
    status_account: '',
    // fetchProducts: async () => {
    //     const res = await fetch('https://api....')
    //     set({ products: await res.json() })
    // },
})
