export enum TypeAccounts {
  teacher = 'teacher',
  student = 'student',
  admin = 'admin',
}

export interface UserResponse {
  fullname: string;
  email: string;
  initial_register: TypeAccounts;
}
