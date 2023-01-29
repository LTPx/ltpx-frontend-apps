import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    addNewContent,
    removeContent,
    getCourse,
    loadedCourse,
    course,
    contents,
  } = useAppStore();

  return {
    addNewContent,
    removeContent,
    getCourse,
    loadedCourse,
    course,
    contents,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom
  };
};
