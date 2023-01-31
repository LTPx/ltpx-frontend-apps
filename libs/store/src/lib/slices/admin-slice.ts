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
  currentApplication: ApplicationTeach;
  getStoreApplication: (id: number) => void;
  pendingApplications: () => Promise<TResponse>;
};

export const createAdminSlice: StateCreator<
  StoreState,
  [],
  [],
  AdminSlice
> = (set, get) => ({
  applications: [],
  currentApplication: {} as ApplicationTeach,
  getStoreApplication: (id: number) => {
    const applications = get().applications || [];
    const application = applications.find((application)=> application.id === id) || {} as ApplicationTeach;
    set({currentApplication: application})
  },
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
