import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    _addCourseSession,
    addNewContent,
    addNewQuiz,
    addNewAchievement,
    addUpdateClassroom,
    removeContent,
    removeQuiz,
    removeAchievement,
    updateQuiz,
    updateContent,
    updateAchievement,
    updateCourse,
    getCourse,
    loadedCourse,
    course,
  } = useAppStore();

  return {
    _addCourseSession,
    addNewContent,
    addNewQuiz,
    addNewAchievement,
    addUpdateClassroom,
    removeContent,
    removeQuiz,
    removeAchievement,
    updateQuiz,
    updateContent,
    updateAchievement,
    updateCourse,
    getCourse,
    loadedCourse,
    course,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom
  };
};
