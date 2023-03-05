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
    _getStudentQuizzes,
    _getStudentQuiz,
    _getStudentQuizResult,
    _evaluateQuiz,
    _getStudentAchievements,
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
    _getStudentQuizzes,
    _getStudentQuiz,
    _getStudentQuizResult,
    _evaluateQuiz,
    _getStudentAchievements,
  }
}
