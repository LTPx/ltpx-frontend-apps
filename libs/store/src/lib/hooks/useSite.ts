import { useAppStore } from "../store";

export const useSite = () => {
  const {
    currentFullCourse,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
  } = useAppStore();

  return {
    currentFullCourse,
    _getPopularCourses,
    _getSiteCourse,
    _confirmUserPayment,
    _createPaymentOrder,
    _cancelUserPayment,
  }
}
