import { useAppStore } from "../store";

export const useUser = () => {
  const {
    user,
    isAuthenticated,
    addCourseCart,
    removeCourseCart,
    cart,
    logout,
    login,
    register,
    registerTeacher
  } = useAppStore();

  return {
    products: cart.courses,
    totalProducts: cart.courses.length,
    isTeacher: user.initial_register === 'teacher',
    user,
    login,
    register,
    registerTeacher,
    isAuthenticated,
    addCourseCart,
    removeCourseCart,
    logout
  }
}
