import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    addNewContent,
    removeContent,
    removeQuiz,
    removeAchievement,
    getCourse,
    loadedCourse,
    course,
    contents,
  } = useAppStore();

  return {
    addNewContent,
    removeContent,
    removeQuiz,
    removeAchievement,
    getCourse,
    loadedCourse,
    course,
    contents,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom
  };
};
