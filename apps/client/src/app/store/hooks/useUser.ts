import { useAppStore } from "../store";

export const useUser = () => {
  const {
    user,
    currentView,
    isAuthenticated,
    addCourseCart,
    removeCourseCart,
    cart,
    logout,
    login,
    register,
    registerTeacher,
    getCurrentUser,
  } = useAppStore();

  return {
    products: cart.courses,
    totalProducts: cart.courses.length,
    isTeacher: user.initial_register === 'teacher',
    user,
    currentView,
    login,
    register,
    registerTeacher,
    getCurrentUser,
    isAuthenticated,
    addCourseCart,
    removeCourseCart,
    logout
  }
}
