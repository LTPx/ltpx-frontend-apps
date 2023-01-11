import { useAppStore } from "../store";

export const useTeacher = () => {
  const {
    teacher_account,
    registerTeacher,
    applyTeach,
    createCourse,
    getApplicationTeach,
    application,
  } = useAppStore();

  return {
    teacher_account,
    registerTeacher,
    applyTeach,
    createCourse,
    getApplicationTeach,
    application,
  }
}
