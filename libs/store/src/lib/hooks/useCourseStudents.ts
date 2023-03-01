import { useAppStore } from '../store';

export const useCourseStudents = () => {
  const {
    _getCourseStudents
  } = useAppStore();

  return {
    _getCourseStudents
  };
};
