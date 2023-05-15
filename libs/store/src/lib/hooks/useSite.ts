import { useAppStore } from "../store";

export const useSite = () => {
  const {
    currentFullCourse,
    categories,
    allCategories,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
    _getTeacherProfile,
    _getPopularCategories,
    _getCoursesByCategory,
    _getAllCategories,
    categoriesForSelect,
  } = useAppStore();

  return {
    currentFullCourse,
    categories,
    allCategories,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
    _getTeacherProfile,
    _getPopularCategories,
    _getCoursesByCategory,
    _getAllCategories,
    categoriesForSelect,
  }
}
