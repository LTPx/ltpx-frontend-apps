import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    addNewContent,
    removeContent,
    removeQuiz,
    getCourse,
    loadedCourse,
    course,
    contents,
  } = useAppStore();

  return {
    addNewContent,
    removeContent,
    removeQuiz,
    getCourse,
    loadedCourse,
    course,
    contents,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom
  };
};
