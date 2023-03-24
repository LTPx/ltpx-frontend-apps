import { COUNTRIES_ABLE_APP, FeedbackAction } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';

export const useUtil = () => {
  const { t } = useTranslation();
  const { setFeedbackAction } = useAppStore();

  const countries = COUNTRIES_ABLE_APP.map((value) => {
    return {
      text: t(`countries.${value}`),
      value: value,
    };
  });

  const translateStatusApply = (status: string) => {
    return t(`application_teacher_status.${status}`);
  };

  const setMessageToast = (type: 'success' | 'error' | 'information', text: string) => {
    setFeedbackAction({
      type,
      text
    })
  }

  const clearMessageToast = () => {
    setFeedbackAction({} as FeedbackAction)
  }

  return {
    countries,
    translateStatusApply,
    setMessageToast,
    clearMessageToast
  };
};
