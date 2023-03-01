import { useAppStore } from '../store';

export const useCourseStudents = () => {
  const {
    _getStudentsByCourse,
    _getStudentQuizzesByCourse,
  } = useAppStore();

  return {
    _getStudentsByCourse,
    _getStudentQuizzesByCourse,
  };
};
