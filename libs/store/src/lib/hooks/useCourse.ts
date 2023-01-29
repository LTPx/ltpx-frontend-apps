import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    addNewContent,
    getCourse,
    loadedCourse,
    course
  } = useAppStore();

  return {
    addNewContent,
    getCourse,
    loadedCourse,
    course,
    contents: course.contents,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom
  };
};
