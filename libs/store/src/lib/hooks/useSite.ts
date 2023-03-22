import { useAppStore } from "../store";

export const useSite = () => {
  const {
    currentFullCourse,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
    _getTeacherProfile
  } = useAppStore();

  return {
    currentFullCourse,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
    _getTeacherProfile,
  }
}
