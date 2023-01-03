import { useAppStore } from "../store";

export const useTeacher = () => {
  const {
    registerTeacher,
    applyTeach,
    teacher_account
  } = useAppStore();

  return {
    registerTeacher,
    teacher_account,
    applyTeach
  }
}
