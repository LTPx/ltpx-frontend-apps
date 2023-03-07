import { MeetingModel, MeetingNestedModel } from "./meeting-interface";
import { PartialBy, Prettify } from "./util";

export interface CourseSessionModel {
  id: number;
  user_id: number;
  course_id: number;
  max_participants: number;
  call_time_min: number;
  public: boolean;
  private_sessions: boolean;
  meetings_attributes: MeetingNestedModel[];
  created_at: string;
  updated_at: string;
}

export interface CourseSession {
  id: number;
  user_id: number;
  course_id: number;
  max_participants: number;
  call_time_min: number;
  public: boolean;
  private_sessions: boolean;
  meetings: MeetingModel[];
  created_at: string;
  updated_at: string;
}

export type BasicSessionParams = Omit<
  CourseSessionModel,
  'created_at' | 'updated_at' | 'public'
>;

export type NewCourseSessionParams = Omit<
  CourseSessionModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'public' | 'course_id'
>;

export type EditSessionParams = Omit<
  CourseSessionModel,
  'user_id' | 'created_at' | 'updated_at' | 'course_id'
>;

export type SessionParams = Prettify<PartialBy<
  BasicSessionParams, 'id' | 'user_id' | 'course_id'
>>;
