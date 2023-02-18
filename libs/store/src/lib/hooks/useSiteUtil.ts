import {
  AchievementModel,
  CATEGORIES,
  LANGUAGES,
  LEVELS,
} from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';

export const useSiteUtil = () => {
  const { t } = useTranslation();

  const translateCover = (type: string) => {
    return t(`achievements_types.${type}`);
  };

  return {
    translateCover,
  };
};
