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

export interface IRegisterUser {
  fullname: string;
  email: string;
  password: string;
}

export interface ICredentials {
  email: string;
  password: string;
}
