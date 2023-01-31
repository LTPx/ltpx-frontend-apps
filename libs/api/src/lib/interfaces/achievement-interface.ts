import { PartialBy } from "./util";

export enum TypeAchievement {
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
  rule: TypeAchievement;
  image: string;
  price: number;
  settings: SettingAchievement[];
  created_at: string;
  updated_at: string;
}

export type NewAchievementParams = Omit<
  AchievementModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'course_id'
>;

export type EditAchievementParams = Omit<
  AchievementModel,
  'user_id' | 'created_at' | 'updated_at' | 'course_id'
>;

export type AchievementParamsUi = PartialBy<
EditAchievementParams,
  'id'
>;

export interface SettingAchievement {
  entity: EntityAchievement;
  entity_id: number;
  score: number;
}
