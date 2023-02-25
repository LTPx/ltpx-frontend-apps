import { useAppStore } from "../store";

export const useStudent = () => {
  const {
    purchases,
    enrolledCourses,
    enrolledCourse,
    currentCourse,
    currentQuiz,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
    _getStudentCourse,
    _getStudentQuiz,
    _evaluateQuiz,
  } = useAppStore();

  return {
    purchases,
    enrolledCourses,
    enrolledCourse,
    currentCourse,
    currentQuiz,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
    _getStudentCourse,
    _getStudentQuiz,
    _evaluateQuiz,
  }
}
