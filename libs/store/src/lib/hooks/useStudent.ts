import { useAppStore } from "../store";

export const useStudent = () => {
  const {
    purchases,
    enrolledCourses,
    _getStudentCourses,
    _getStudentPayments,
  } = useAppStore();

  return {
    purchases,
    enrolledCourses,
    _getStudentCourses,
    _getStudentPayments,
  }
}
