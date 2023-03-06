import { useAppStore } from '../store';

export const useCourse = () => {
  const {
    _addCourseSession,
    addNewContent,
    _addQuiz,
    _addAchievement,
    addUpdateClassroom,
    removeContent,
    _removeQuiz,
    _removeAchievement,
    _updateQuiz,
    updateContent,
    _updateAchievement,
    _updateCourse,
    getCourse,
    loadedCourse,
    course,
    cleanCourse,
    _addTask,
  } = useAppStore();

  return {
    _addCourseSession,
    addNewContent,
    _addQuiz,
    _addAchievement,
    addUpdateClassroom,
    removeContent,
    _removeQuiz,
    _removeAchievement,
    _updateQuiz,
    updateContent,
    _updateAchievement,
    _updateCourse,
    getCourse,
    loadedCourse,
    course,
    cleanCourse,
    quizzes: course.quizzes,
    achievements: course.achievements,
    classroom: course.classroom,
    _addTask,
  };
};
