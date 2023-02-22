import { useAppStore } from "../store";

export const useStudent = () => {
  const {
    purchases,
    enrolledCourses,
    enrolledCourse,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
    _getStudentCourse,
  } = useAppStore();

  return {
    purchases,
    enrolledCourses,
    enrolledCourse,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
    _getStudentCourse,
  }
}
