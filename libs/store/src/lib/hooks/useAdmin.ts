import { useAppStore } from "../store";

export const useAdmin = () => {
  const {
    applications,
    courses,
    getApplicationStore,
    getCourseStore,
    viewApplication,
    viewCourse,
    _pendingApplications,
    _getApplication,
    _approveApplication,
    _approvedApplications,
    _getUsers,
    _getPendingApproveCourses,
    _getCourse,
  } = useAppStore();

  return {
    applications,
    courses,
    getApplicationStore,
    getCourseStore,
    viewApplication,
    viewCourse,
    _pendingApplications,
    _getApplication,
    _approveApplication,
    _approvedApplications,
    _getUsers,
    _getPendingApproveCourses,
    _getCourse,
  }
}
