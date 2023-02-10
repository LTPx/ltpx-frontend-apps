import { useAppStore } from "../store";

export const useSite = () => {
  const {
    _getPopularCourses,
    _getSiteCourse,
    _enrollUser,
    _registerPaymentCourse,
  } = useAppStore();

  return {
    _getPopularCourses,
    _getSiteCourse,
    _enrollUser,
    _registerPaymentCourse,
  }
}
