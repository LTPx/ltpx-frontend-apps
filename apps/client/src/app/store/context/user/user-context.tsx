import { Course } from "@ltpx-frontend-apps/api";
import { createContext } from "react";
import { User, UserState } from "../../interfaces/user";

export type UserContextProps = {
  userState: UserState;
  setUser: (user: User) => void;
  logoutApp: () => void;
  addCourseToCart: (course: Course) => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

