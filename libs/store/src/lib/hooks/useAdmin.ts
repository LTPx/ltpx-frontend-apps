import { useAppStore } from "../store";

export const useAdmin = () => {
  const {
    applications,
    courses,
    getStoreApplication,
    currentApplication,
    _pendingApplications,
    _getApplication,
    _approveApplication,
    _approvedApplications,
    _getUsers,
    _getPendingApproveCourses,
  } = useAppStore();

  return {
    applications,
    courses,
    getStoreApplication,
    currentApplication,
    _pendingApplications,
    _getApplication,
    _approveApplication,
    _approvedApplications,
    _getUsers,
    _getPendingApproveCourses,
  }
}
