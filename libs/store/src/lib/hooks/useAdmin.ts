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
    _getPendingReviewCourses,
    _getCourse,
    _approveCourse,
    _getApprovedCourses,
    _getWithdrawalsByStatus,
    _getWithdrawal,
    _approveWithdrawal,
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
    _getPendingReviewCourses,
    _getCourse,
    _approveCourse,
    _getApprovedCourses,
    _getWithdrawalsByStatus,
    _getWithdrawal,
    _approveWithdrawal,
  }
}
