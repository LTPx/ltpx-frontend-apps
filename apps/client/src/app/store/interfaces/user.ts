import { Course, TypeAccounts } from "@ltpx-frontend-apps/api";

export interface User {
  email: string;
  fullname: string;
  initial_register: TypeAccounts;
}

export interface UserState {
  user: User;
  isAuthenticated: boolean;
  cart: {
    courses: Course[];
  }
}
