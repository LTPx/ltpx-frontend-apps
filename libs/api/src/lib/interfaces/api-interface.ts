export type FormatResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type FeedbackAction = {
  type: 'success' | 'error' | 'information';
  text: string;
};
