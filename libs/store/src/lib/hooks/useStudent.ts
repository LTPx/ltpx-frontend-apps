import { useAppStore } from "../store";

export const useStudent = () => {
  const {
    purchases,
    enrolledCourses,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
  } = useAppStore();

  return {
    purchases,
    enrolledCourses,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
  }
}
