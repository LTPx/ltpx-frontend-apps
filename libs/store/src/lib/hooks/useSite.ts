import { useAppStore } from "../store";

export const useSite = () => {
  const {
    currentFullCourse,
    categories,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
    _getTeacherProfile,
    _getPopularCategories,
    _getCoursesByCategory,
  } = useAppStore();

  return {
    currentFullCourse,
    categories,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
    _getTeacherProfile,
    _getPopularCategories,
    _getCoursesByCategory,
  }
}
