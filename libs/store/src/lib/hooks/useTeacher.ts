import { useAppStore } from "../store";

export const useTeacher = () => {
  const {
    loadingTeacherApi,
    teacher_account,
    registerTeacher,
    applyTeach,
    createCourse,
    editCourse,
    getApplicationTeach,
    application,
    profile,
    getProfile,
    _updateProfile,
    createAchievement,
    getCourse,
    currentCourse,
    wallet,
    _sendCourseToReview,
    _getWallet,
    _getClassrooms,
    _getCourses,
    _getMeetingRoomId,
    _validateMeetingRoomId,
    _makeWithdrawal,
    _getTeacherRooms
  } = useAppStore();

  return {
    loadingTeacherApi,
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
    _updateProfile,
    createAchievement,
    getCourse,
    wallet,
    _sendCourseToReview,
    _getWallet,
    _getClassrooms,
    _getCourses,
    _getMeetingRoomId,
    _validateMeetingRoomId,
    _makeWithdrawal,
    _getTeacherRooms
  }
}
