import { useAppStore } from "../store";

export const useSite = () => {
  const {
    currentFullCourse,
    categories,
    allCategories,
    categoriesForSelect,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
    _getTeacherProfile,
    _getPopularCategories,
    _getCoursesByCategory,
    _getAllCategories,
    _getCertificate,
  } = useAppStore();

  return {
    currentFullCourse,
    categories,
    allCategories,
    categoriesForSelect,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
    _getTeacherProfile,
    _getPopularCategories,
    _getCoursesByCategory,
    _getAllCategories,
    _getCertificate
  }
}
