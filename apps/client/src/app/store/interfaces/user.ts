import { Course } from "@ltpx-frontend-apps/api";
export interface User {
  email: string;
  name: string;
}

export interface UserState {
  user: User;
  isAuthenticated: boolean;
  cart: {
    courses: Course[];
  }
}
