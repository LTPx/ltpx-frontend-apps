export enum StatusTeacherAccount {
  review = "review",
  active = "active",
  disable = "disable",
  deleted = "deleted",
  unapplied = "unapplied",
}

export interface ITeacher {
  teacher_name: string;
  experience: string;
  degrees: string;
  national_id: string;
  biography?: string;
  status_account: StatusTeacherAccount;
}

export interface IApplyTeachFields {
  name: string,
  phone: string,
  nationalId: string,
  country: string,
  city: string,
  experience: string,
  degrees: string,
  record_police: string,
}


