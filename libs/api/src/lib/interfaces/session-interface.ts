export interface SessionModel {
  id: number;
  user_id: number;
  course_id: number;
  available_spaces: number;
  call_time_min: number;
  public: boolean;
  private_sessions: boolean;
  meetings: string[];
  created_at: string;
  updated_at: string;
}

export type NewCourseSessionParams = Omit<
  SessionModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'public' | 'course_id'
>;

export type EditSessionParams = Omit<
  SessionModel,
  'user_id' | 'created_at' | 'updated_at' | 'course_id'
>;
