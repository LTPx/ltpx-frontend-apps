import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    addNewContent,
    addNewQuiz,
    addNewAchievement,
    addUpdateClassroom,
    removeContent,
    removeQuiz,
    removeAchievement,
    updateQuiz,
    getCourse,
    loadedCourse,
    course,
  } = useAppStore();

  return {
    addNewContent,
    addNewQuiz,
    addNewAchievement,
    addUpdateClassroom,
    removeContent,
    removeQuiz,
    removeAchievement,
    updateQuiz,
    getCourse,
    loadedCourse,
    course,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom
  };
};
