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
  quiz_id: number;
  min_score: number;
}

export interface ConditionByTask {
  quiz_id: number;
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
  | 'user_id'
  | 'course_id'
  | 'condition_tasks'
  | 'condition_quizzes'
  | 'created_at'
  | 'updated_at'
  | 'settings'
>;

type AchievementNestedAttributes = {
  condition_quizzes_attributes: Prettify<PartialBy<ConditionByQuiz, 'min_score'>>[];
  condition_tasks_attributes: Prettify<PartialBy<ConditionByTask, 'min_score'>>[];
};

export type NewAchievementParams = Prettify<
  AchievementMandatoryParams & AchievementNestedAttributes
>;

export type EditAchievementParams = Prettify<
  AchievementMandatoryParams & AchievementNestedAttributes
>;

export interface AchievementParams {
  id: number;
  course_id: number;
  title: string;
  rule: TypeAchievement;
  image: string;
  price: number;
  condition_quizzes: ConditionByQuiz[];
  condition_tasks: ConditionByTask[];
}

// export type EditAchievementParams = Omit<
//   AchievementModel,
//   'user_id' | 'created_at' | 'updated_at' | 'course_id'
// >;

export type AchievementParamsUi = Prettify<
  PartialBy<EditAchievementParams, 'id'>
>;

export interface SettingAchievement {
  entity: EntityAchievement;
  entity_id: number;
  score: number;
  text: string;
}
