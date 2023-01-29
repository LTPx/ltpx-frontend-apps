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
    createQuiz,
    createAchievement,
    getCourse,
    currentCourse
  } = useAppStore();

  return {
    course: currentCourse,
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
    createQuiz,
    createAchievement,
    getCourse,
  }
}
