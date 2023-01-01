import { User } from "./user";

export interface TeacherState {
  user: User;
  isAuthenticated: boolean;
  applied: boolean;
  status_account: string;
}
