export enum StatusTeacherAccount {
  review = 'review',
  active = 'active',
  disable = 'disable',
  deleted = 'deleted',
  approved = 'approved',
  unapplied = 'unapplied',
}

export interface BankAccount {
  bank_name: string;
  owner_account_name: string;
  national_id: string;
  bank_account_number: string;
  bank_account_type: string;
}

export interface TeacherProfile {
  teacher_name: string;
  skills: string;
  biography: string;
  social_networks: { name: string; url: string }[];
  bank_accounts: BankAccount[];
  national_id: string;
  status_account: StatusTeacherAccount;
  image: string;
  video: string;
}

export interface ITeacher {
  teacher_name: string;
  experience: string;
  degrees: string;
  national_id: string;
  biography?: string;
  status_account: StatusTeacherAccount;
}

interface AttachFile {
  file_url: string;
  filename: string;
}
export interface ApplyTeachModel {
  id: number;
  user_id: number;
  reviewer_id: number;
  name: string;
  national_id: string;
  phone: string;
  country: string;
  city: string;
  experience: string;
  degrees: string;
  status: string;
  created_at: string;
  updated_at: string;
  national_id_front: any;
  national_id_back: any;
  police_record: any;
  degrees_files: any;
  degrees_attached_files?: AttachFile[];
}

export type ApplyTeachApiParams = Omit<
  ApplyTeachModel,
  'user_id' | 'id' | 'reviewer_id' | 'created_at' | 'updated_at' | 'status'
>;

export type ApplicationTeach = Omit<ApplyTeachModel, 'user_id' | 'reviewer_id'>;
export type TeacherProfileParams = Partial<TeacherProfile>;
