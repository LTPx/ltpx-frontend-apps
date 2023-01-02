export interface Teacher {
  teacher_name: string;
  experience: string;
  degrees: string;
  national_id: string;
  biography?: string;
}

export enum StatusTeacherAccount {
  review = "review",
  active = "active",
  disable = "disable",
  deleted = "deleted",
  unapplied = "unapplied",
}
