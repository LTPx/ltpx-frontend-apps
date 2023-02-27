import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    _getCourseStudents,
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
    cleanCourse,
  } = useAppStore();

  return {
    _getCourseStudents,
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
    cleanCourse,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom
  };
};
