import { createContext } from "react";
import { User, UserState } from "../../interfaces/user";

export type UserContextProps = {
  userState: UserState;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

