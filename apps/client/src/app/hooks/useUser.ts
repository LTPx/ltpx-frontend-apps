import { useContext } from "react";
import { UserContext } from "../store/context/user/user-context";

export const useUser = () => {
  const { userState, setUser } = useContext(UserContext);

  return {
    user: userState.user,
    isLogged: userState.logged,
    setUser
  }
}
