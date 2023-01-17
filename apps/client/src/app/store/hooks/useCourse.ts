import { CATEGORIES, LANGUAGES, LEVELS } from "@ltpx-frontend-apps/api";
import { useTranslation } from "react-i18next";

export const useCourse = () => {
  const { t } = useTranslation();

  const categories = CATEGORIES.map((value)=>{
    return {
      text: t(`course_categories.${value}`),
      value: value
    };
  })

  const levels = LEVELS.map((value)=>{
    return {
      text: t(`levels.${value}`),
      value: value
    };
  })

  const languages = LANGUAGES.map((value)=>{
    return {
      text: t(`languages.${value}`),
      value: value
    };
  })

  return {
    categories,
    languages,
    levels
  }
}
