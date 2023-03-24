import { COUNTRIES_ABLE_APP } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';

export const useUtil = () => {
  const { t } = useTranslation();

  const countries = COUNTRIES_ABLE_APP.map((value) => {
    return {
      text: t(`countries.${value}`),
      value: value,
    };
  });

  const translateStatusApply = (status: string) => {
    return t(`application_teacher_status.${status}`);
  };

  return {
    countries,
    translateStatusApply
  };
};
