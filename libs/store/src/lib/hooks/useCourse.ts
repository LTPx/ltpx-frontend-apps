import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    addNewContent,
    addNewAchievement,
    removeContent,
    removeQuiz,
    removeAchievement,
    getCourse,
    loadedCourse,
    course,
  } = useAppStore();

  return {
    addNewContent,
    addNewAchievement,
    removeContent,
    removeQuiz,
    removeAchievement,
    getCourse,
    loadedCourse,
    course,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom
  };
};
