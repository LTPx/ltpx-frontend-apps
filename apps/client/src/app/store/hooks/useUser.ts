import { useAppStore } from "../store";

export const useUser = () => {
  const {
    user,
    isAuthenticated,
    setUser,
    addCourseCart,
    removeCourseCart,
    cart,
    logoutApp
  } = useAppStore();

  return {
    products: cart.courses,
    totalProducts: cart.courses.length,
    user,
    setUser,
    isAuthenticated,
    addCourseCart,
    removeCourseCart,
    logoutApp
  }
}
