import {
  ACCOUNT_BANK,
  AchievementModel,
  CATEGORIES,
  LANGUAGES,
  LEVELS,
  OPTIONS
} from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';

export const useCourseUtil = () => {
  const { t } = useTranslation();

  const categories = CATEGORIES.map((value) => {
    return {
      text: t(`course_categories.${value}`),
      value: value,
    };
  });

  const levels = LEVELS.map((value) => {
    return {
      text: t(`levels.${value}`),
      value: value,
    };
  });

  const accountBankType = ACCOUNT_BANK.map((value) => {
    return {
      text: t(`accountBankType.${value}`),
      value: value,
    };
  });

  const languages = LANGUAGES.map((value) => {
    return {
      text: t(`languages.${value}`),
      value: value,
    };
  });

  const options = OPTIONS.map((value) => {
    return {
      text: t(`options.${value}`),
      value: value,
    };
  });

  const translateOption = (option: string) => {
    return t(`option_conditional_test.${option}`);
  };

  const translateCategory = (category: string) => {
    return t(`course_categories.${category}`);
  };

  const translateLevel = (level: string) => {
    return t(`levels.${level}`);
  };

  const translateLanguage = (language: string) => {
    return t(`languages.${language}`);
  };

  const translateAccountType = (accountType: string) => {
    return t(`accountBankType.${accountType}`);
  };

  const translateStatus = (status: string) => {
    return t(`course_status.${status}`);
  };

  const translateQuizCategories = (category: string) => {
    return t(`quizzes_categories.${category}`);
  };

  const translateAchievementType = (type: string) => {
    return t(`achievements_types.${type}`);
  };

  return {
    categories,
    languages,
    levels,
    options,
    accountBankType,
    translateCategory,
    translateLevel,
    translateLanguage,
    translateStatus,
    translateQuizCategories,
    translateAchievementType,
    translateOption,
    translateAccountType
  };
};
