import { useAppStore } from '../store';

export const useCourseStudents = () => {
  const {
    _getStudentsByCourse,
    _getStudentQuizzesByCourse,
    _getStudentAchievementsByCourse,
    _getStudentTasksByCourse,
    _teacherGradeTask,
    _teacherGradeQuiz,
    _teacherFeedbackQuiz,
  } = useAppStore();

  return {
    _getStudentsByCourse,
    _getStudentQuizzesByCourse,
    _getStudentAchievementsByCourse,
    _getStudentTasksByCourse,
    _teacherGradeTask,
    _teacherGradeQuiz,
    _teacherFeedbackQuiz,
  };
};
