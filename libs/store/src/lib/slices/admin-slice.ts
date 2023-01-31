import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  getPendingApplications,
  ApplicationTeach,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: Error;
};

export type AdminSlice = {
  applications: ApplicationTeach[];
  pendingApplications: () => Promise<TResponse>;
};

export const createAdminSlice: StateCreator<
  StoreState,
  [],
  [],
  AdminSlice
> = (set, get) => ({
  applications: [],
  pendingApplications: async (): Promise<TResponse> => {
    try {
      const applications = await getPendingApplications();
      set({applications})
      return { success: true, data: applications };
    } catch (error) {
      set({ loadedCourse: true });
      return { success: false, data: error };
    }
  },
});
