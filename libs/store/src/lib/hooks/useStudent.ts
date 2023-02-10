import { useAppStore } from "../store";

export const useStudent = () => {
  const {
    _getStudentCourses,
    _getStudentPayments,
  } = useAppStore();

  return {
    _getStudentCourses,
    _getStudentPayments,
  }
}
