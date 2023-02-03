import { useAppStore } from "../store";

export const useSite = () => {
  const {
    _getPopularCourses,
    _getSiteCourse,
  } = useAppStore();

  return {
    _getPopularCourses,
    _getSiteCourse,
  }
}
