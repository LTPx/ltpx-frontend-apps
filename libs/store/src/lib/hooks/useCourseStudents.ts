import { useAppStore } from '../store';

export const useCourseStudents = () => {
  const {
    _getStudentsByCourse,
    _getStudentQuizzesByCourse,
    _getStudentAchievementsByCourse,
  } = useAppStore();

  return {
    _getStudentsByCourse,
    _getStudentQuizzesByCourse,
    _getStudentAchievementsByCourse,
  };
};
