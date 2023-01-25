export enum RuleAchievement {
  multiple = 'multiple',
  single = 'single',
  task = 'task',
  score = 'score',
}

export enum EntityAchievement {
  quiz = 'quiz',
  task = 'task',
  content = 'content',
}

export interface AchievementModel {
  id: number;
  user_id: number;
  course_id: number;
  title: string;
  rule: RuleAchievement;
  image: string;
  settings: SettingAchievement[];
  created_at: string;
  updated_at: string;
}

export type NewAchievementParams = Omit<
  AchievementModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'course_id'
>;

export interface SettingAchievement {
  entity: EntityAchievement;
  entity_id: number;
  score: number;
}