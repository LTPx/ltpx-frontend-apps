import { useAppStore } from "../store";

export const useTeacher = () => {
  const {
    teacher_account,
    registerTeacher,
    applyTeach,
    createCourse,
    editCourse,
    getApplicationTeach,
    application,
    profile,
    getProfile,
    updateProfile,
    myQuizzes,
    createQuiz,
    createAchievement,
  } = useAppStore();

  return {
    teacher_account,
    registerTeacher,
    applyTeach,
    createCourse,
    editCourse,
    getApplicationTeach,
    application,
    profile,
    getProfile,
    updateProfile,
    myQuizzes,
    createQuiz,
    createAchievement,
  }
}
