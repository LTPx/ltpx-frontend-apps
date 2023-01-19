import { useAppStore } from "../store";

export const useTeacher = () => {
  const {
    teacher_account,
    registerTeacher,
    applyTeach,
    createCourse,
    getApplicationTeach,
    application,
    profile,
    getProfile,
    updateProfile,
    myQuizzes,
    createQuiz,
  } = useAppStore();

  return {
    teacher_account,
    registerTeacher,
    applyTeach,
    createCourse,
    getApplicationTeach,
    application,
    profile,
    getProfile,
    updateProfile,
    myQuizzes,
    createQuiz
  }
}
