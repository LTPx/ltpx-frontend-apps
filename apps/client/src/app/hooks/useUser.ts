import { useContext } from "react";
import { UserContext } from "../store/context/user/user-context";

export const useUser = () => {
  const {
    userState,
    setUser,
    logoutApp,
    addCourseToCart,
    removeCourseFromCart
  } = useContext(UserContext);

  return {
    user: userState.user,
    isAuthenticated: userState.isAuthenticated,
    products: userState.cart.courses,
    setUser,
    logoutApp,
    addCourseToCart,
    removeCourseFromCart
  }
}
