export interface MeetingModel {
  id: number;
  teacher_id: number;
  course_session_id: number;
  participants_ids: number[];
  meeting_id: string;
  start_date: string;
  end_date: string;
  date: string;
  day_number: string;
  start_time: string;
  end_time: string;
  month: string;
  created_at: string;
  updated_at: string;
}
export interface MeetingNestedModel {
  host_user_id: number;
  start_date: string;
  id?: number;
  _destroy?: boolean;
}

export type NewMeetingParams = Omit<
  MeetingModel,
  'id' | 'created_at' | 'updated_at' | 'meeting_id' | 'participants_ids'
>;
