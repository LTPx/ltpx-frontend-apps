import { COUNTRIES_ABLE_APP, FeedbackAction } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';

export const useUtil = () => {
  const { t } = useTranslation();
  const { setFeedbackAction, cleanNewNotification } = useAppStore();

  const countries = COUNTRIES_ABLE_APP.map((value) => {
    return {
      text: t(`countries.${value}`),
      value: value,
    };
  });

  const translateStatusApply = (status: string) => {
    return t(`application_teacher_status.${status}`);
  };

  const setMessageToast = (
    type: 'success' | 'error' | 'information',
    text: string
  ) => {
    setFeedbackAction({
      type,
      text,
    });
  };

  const clearMessageToast = () => {
    setFeedbackAction({} as FeedbackAction);
    cleanNewNotification();
  };

  const capitalizeSentence = (sentence: string) => {
    const words = sentence.split(' ');

    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
      })
      .join(' ');
  };

  return {
    countries,
    translateStatusApply,
    setMessageToast,
    clearMessageToast,
    capitalizeSentence
  };
};
