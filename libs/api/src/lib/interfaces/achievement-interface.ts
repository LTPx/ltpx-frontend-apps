import { PartialBy, Prettify } from './util';

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

export interface ConditionByQuiz {
  id: number;
  min_score: number;
}

export interface ConditionByTask {
  id: number;
  min_score: number;
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
  condition_quizzes: ConditionByQuiz[];
  condition_tasks: ConditionByTask[];
  created_at: string;
  updated_at: string;
}

type AchievementMandatoryParams = Omit<
  AchievementModel,
  | 'id'
  | 'user_id'
  | 'course_id'
  | 'condition_tasks'
  | 'condition_quizzes'
  | 'created_at'
  | 'updated_at'
>;

type AchievementNestedAttributes = {
  condition_quizzes_attributes: ConditionByQuiz[];
  condition_tasks_attributes: ConditionByTask[];
};

export type NewAchievementParams = AchievementMandatoryParams &
  AchievementNestedAttributes;

export type EditAchievementParams = Omit<
  AchievementModel,
  'user_id' | 'created_at' | 'updated_at' | 'course_id'
>;

export type AchievementParamsUi = Prettify<PartialBy<EditAchievementParams, 'id'>>;

export interface SettingAchievement {
  entity: EntityAchievement;
  entity_id: number;
  score: number;
  text: string;
}
