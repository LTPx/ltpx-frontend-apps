export enum TypeAccounts {
  teacher = 'teacher',
  user = 'user',
  admin = 'admin',
}

export interface UserResponse {
  fullname: string;
  email: string;
  initial_register: TypeAccounts;
}
