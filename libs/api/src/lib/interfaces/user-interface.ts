import { CartModel } from './cart-interface';
import { BankAccount, StatusTeacherAccount } from './teacher-interface';

export enum TypeAccounts {
  user = 'user',
  teacher = 'teacher',
  student = 'student',
  admin = 'admin',
}

export enum StatusAccount {
  active = 'active',
  removed = 'removed',
  blocked = 'blocked',
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
  initial_view: TypeViews;
  teacher_account?: StatusTeacherAccount;
}

export interface UserStore {
  fullname: string;
  email: string;
  username: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birth: string;
  initial_register: TypeAccounts;
  initial_view: TypeViews;
  teacher_account?: StatusTeacherAccount;
  teacher?: {
    id: number;
    teacher_name: string;
    bank_accounts: BankAccount[];
    profile_image: string;
    biography: string;
    total_courses: number;
  },
  id: number;
  is_teacher: boolean;
  is_student: boolean;
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
  id: number;
  fullname: string;
  email: string;
  password: string;
  initial_register: TypeAccounts;
  initial_view: TypeViews;
  teacher_account?: StatusTeacherAccount;
  username: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birth: string;
  cart?: CartModel;
  total_unread_notifications: number;
  is_teacher: boolean;
  is_student: boolean;
}

export interface IUserAccount {
  id?: number;
  fullname: string;
  username: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birth: string;
  email: string;
}

export interface INewPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserModel {
  id                     :number;
  email                  :string;
  created_at             :string;
  updated_at             :string;
  fullname               :string;
  username               :string;
  country                :string;
  city                   :string;
  address                :string;
  phone                  :string;
  initial_register       :TypeAccounts;
  initial_vial           :TypeViews;
}

export interface UserBasic {
  id :number;
  email :string;
  fullname :string;
  username :string;
}
