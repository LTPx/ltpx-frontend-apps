import { useAppStore } from "../store";

export const useUser = () => {
  const {
    user,
    isAuthenticated,
    setUser,
    addCourseCart,
    removeCourseCart,
    cart,
    logout,
    login,
  } = useAppStore();

  return {
    products: cart.courses,
    totalProducts: cart.courses.length,
    user,
    login,
    setUser,
    isAuthenticated,
    addCourseCart,
    removeCourseCart,
    logout
  }
}
