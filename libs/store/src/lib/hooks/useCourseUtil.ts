import { CATEGORIES, LANGUAGES, LEVELS } from '@ltpx-frontend-apps/api';
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

  const languages = LANGUAGES.map((value) => {
    return {
      text: t(`languages.${value}`),
      value: value,
    };
  });

  const translateCategory = (category: string) => {
    return t(`course_categories.${category}`);
  };

  const translateLevel = (level: string) => {
    return t(`levels.${level}`);
  };

  const translateLanguage = (language: string) => {
    return t(`languages.${language}`);
  };

  const translateStatus = (status: string) => {
    return t(`course_status.${status}`);
  };

  const translateQuizCategories = (category: string) => {
    return t(`quizzes_categories.${category}`);
  };

  return {
    categories,
    languages,
    levels,
    translateCategory,
    translateLevel,
    translateLanguage,
    translateStatus,
    translateQuizCategories,
  };
};
