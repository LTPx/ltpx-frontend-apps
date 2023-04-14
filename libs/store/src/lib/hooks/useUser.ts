import { useAppStore } from "../store";

export const useUser = () => {
  const {
    user,
    currentView,
    isAuthenticated,
    logout,
    login,
    loginAdmin,
    register,
    registerTeacher,
    getCurrentUser,
    changePassword,
    notifications,
    addNotification,
  } = useAppStore();

  return {
    isTeacher: user.initial_register === 'teacher',
    user,
    currentView,
    login,
    loginAdmin,
    register,
    registerTeacher,
    getCurrentUser,
    isAuthenticated,
    logout,
    changePassword,
    notifications,
    addNotification,
  }
}
