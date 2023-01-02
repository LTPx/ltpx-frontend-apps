import { useAppStore } from "../store";

export const useUser = () => {
  const {
    user,
    isAuthenticated,
    setUser,
    addCourseCart,
    removeCourseCart,
    cart,
    logoutApp,
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
    logoutApp
  }
}
