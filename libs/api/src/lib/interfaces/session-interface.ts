export interface SessionModel {
  id: number;
  user_id: string;
  course_id: string;
  available_spaces: number;
  call_time_min: number;
  public: boolean;
  private_sessions: boolean;
  meetings: string[];
  created_at: string;
  updated_at: string;
}

export type NewSessionParams = Omit<
  SessionModel,
  'user_id' | 'created_at' | 'updated_at' | 'id'
>;

export type EditSessionParams = Omit<
  SessionModel,
  'user_id' | 'created_at' | 'updated_at' | 'course_id'
>;
