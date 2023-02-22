import { useAppStore } from "../store";

export const useStudent = () => {
  const {
    purchases,
    enrolledCourses,
    enrolledCourse,
    currentCourse,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
    _getStudentCourse,
    _getStudentQuiz,
  } = useAppStore();

  return {
    purchases,
    enrolledCourses,
    enrolledCourse,
    currentCourse,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
    _getStudentCourse,
    _getStudentQuiz,
  }
}
