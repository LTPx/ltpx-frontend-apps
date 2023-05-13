import { useAppStore } from "../store";

export const useAdmin = () => {
  const {
    applications,
    courses,
    getApplicationStore,
    getCourseStore,
    viewApplication,
    viewCourse,
    _getUser,
    _pendingApplications,
    _getApplication,
    _approveApplication,
    _approvedApplications,
    _getUsers,
    _getCourse,
    _approveCourse,
    _getWithdrawalsByStatus,
    _getWithdrawal,
    _approveWithdrawal,
    _rejectApplication,
    _getApplicationsByStatus,
    _rejectCourse,
    _getCoursesByStatus,
    _getCategories,
    _addCategory,
    _removeCategory,
    _updateCategory
  } = useAppStore();

  return {
    applications,
    courses,
    getApplicationStore,
    getCourseStore,
    viewApplication,
    viewCourse,
    _getUser,
    _pendingApplications,
    _getApplication,
    _approveApplication,
    _approvedApplications,
    _getUsers,
    _getCourse,
    _approveCourse,
    _getWithdrawalsByStatus,
    _getWithdrawal,
    _approveWithdrawal,
    _rejectApplication,
    _getApplicationsByStatus,
    _rejectCourse,
    _getCoursesByStatus,
    _getCategories,
    _addCategory,
    _removeCategory,
    _updateCategory
  }
}
