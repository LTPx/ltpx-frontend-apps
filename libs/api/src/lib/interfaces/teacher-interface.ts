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

interface AttachFile {
  file_url: string;
  filename: string;
}
export interface ApplyTeachModel {
  id                         : number;
  user_id                    : number;
  reviewer_id                : number;
  name                       : string;
  national_id                : string;
  phone                      : string;
  country                    : string;
  city                       : string;
  experience                 : string;
  degrees                    : string;
  status                     : string;
  created_at                 : string;
  updated_at                 : string;
  national_id_front          : any;
  national_id_back           : any;
  police_record              : any;
  degrees_files              : any;
  degrees_attached_files?    : AttachFile[];
}

export type ApplyTeachApiParams = Omit<
  ApplyTeachModel, "user_id" | "id" | "reviewer_id" | "created_at" | "updated_at" | "status"
>

export type ApplicationTeach = Omit<
  ApplyTeachModel, "user_id" | "reviewer_id"
>
