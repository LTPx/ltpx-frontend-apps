import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  getPendingApplications,
  ApplicationTeach,
  getApplication,
  approveApplication,
  approvedApplications,
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
  _pendingApplications: () => Promise<TResponse>;
  _approvedApplications: () => Promise<TResponse>;
  _getApplication: (id: number) => void;
  _approveApplication: (id: number) => Promise<TResponse>;
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
  _pendingApplications: async (): Promise<TResponse> => {
    try {
      const applications = await getPendingApplications();
      set({applications})
      return { success: true, data: applications };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _approvedApplications: async (): Promise<TResponse> => {
    try {
      const applications = await approvedApplications();
      set({applications})
      return { success: true, data: applications };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _getApplication: async (id: number): Promise<TResponse> => {
    try {
      const application = await getApplication(id);
      set({currentApplication: application})
      return { success: true, data: application };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _approveApplication: async (id: number): Promise<TResponse> => {
    try {
      const application = await approveApplication(id);
      return { success: true, data: application };
    } catch (error) {
      return { success: false, data: error };
    }
  },
});
