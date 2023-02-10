import { useAppStore } from "../store";

export const useStudent = () => {
  const {
    purchases,
    _getStudentCourses,
    _getStudentPayments,
  } = useAppStore();

  return {
    purchases,
    _getStudentCourses,
    _getStudentPayments,
  }
}
