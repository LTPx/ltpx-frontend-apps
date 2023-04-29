import { FeedbackAction } from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type AppSlice = {
  feedbackAction: FeedbackAction;
  setFeedbackAction: (feedback: FeedbackAction) => void;
  cleanNewNotification: () => void;
};

export const createAppSlice: StateCreator<StoreState, [], [], AppSlice> = (
  set,
  get
) => ({
  feedbackAction: {} as FeedbackAction,
  setFeedbackAction: (feedback) => {
    set({ feedbackAction: feedback });
  },
  cleanNewNotification: () => {
    set({ newNotification: false});
  }
});
