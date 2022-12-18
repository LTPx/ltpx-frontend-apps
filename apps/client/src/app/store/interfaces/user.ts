export interface User {
  email: string;
  name: string;
}

export interface UserState {
  user: User;
  isAuthenticated: boolean
}
