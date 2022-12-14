import { StatusTeacherAccount } from './teacher';

export enum TypeAccounts {
  user = 'user',
  teacher = 'teacher',
  student = 'student',
  admin = 'admin',
}

export enum TypeViews {
  default = 'default',
  user = 'user',
  teacher = 'teacher',
  student = 'student',
}

export interface UserResponse {
  fullname: string;
  email: string;
  initial_register: TypeAccounts;
  teacher_account?: StatusTeacherAccount;
}

export interface UserStore {
  fullname: string;
  email: string;
  initial_register: TypeAccounts;
  teacher_account?: StatusTeacherAccount;
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

export interface ICurrentUser {
  fullname: string;
  email: string;
  password: string;
  initial_register: TypeAccounts;
  teacher_account?: StatusTeacherAccount;
}
