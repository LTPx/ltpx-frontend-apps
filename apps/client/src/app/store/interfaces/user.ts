import { Course } from "@ltpx-frontend-apps/api";

export enum UserRoles {
  teacher = 'teacher',
  student = 'student'
}
export interface User {
  email: string;
  name: string;
  role: UserRoles;
}

export interface UserState {
  user: User;
  isAuthenticated: boolean;
  cart: {
    courses: Course[];
  }
}
