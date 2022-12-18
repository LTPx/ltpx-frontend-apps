import { useContext } from "react";
import { UserContext } from "../store/context/user/user-context";

export const useUser = () => {
  const { userState, setUser, logoutApp } = useContext(UserContext);

  return {
    user: userState.user,
    isAuthenticated: userState.isAuthenticated,
    setUser,
    logoutApp,
  }
}
