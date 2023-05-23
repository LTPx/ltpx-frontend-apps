import { useAppStore } from "../store";

export const useStudent = () => {
  const {
    purchases,
    enrolledCourses,
    enrolledCourse,
    currentCourse,
    currentQuiz,
    allTasks,
    studentDashboard,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
    _getStudentCourse,
    _getStudentQuizzes,
    _getStudentQuiz,
    _getStudentQuizResult,
    _evaluateQuiz,
    _getStudentAchievements,
    _getStudentTasks,
    _getStudentTask,
    _sendTask,
    _getStudentStatists,
  } = useAppStore();

  return {
    purchases,
    enrolledCourses,
    enrolledCourse,
    currentCourse,
    currentQuiz,
    allTasks,
    studentDashboard,
    _getStudentCourses,
    _getStudentPayments,
    _getStudentClasses,
    _getStudentCourse,
    _getStudentQuizzes,
    _getStudentQuiz,
    _getStudentQuizResult,
    _evaluateQuiz,
    _getStudentAchievements,
    _getStudentTasks,
    _getStudentTask,
    _sendTask,
    _getStudentStatists,
  }
}
