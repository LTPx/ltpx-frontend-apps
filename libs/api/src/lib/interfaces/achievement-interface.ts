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
  quiz_id: number;
  min_score: number;
  _destroy?: boolean; //rails remove nested attributes
  quiz_name?: string;
}

export interface ConditionByTask {
  id: number;
  quiz_id: number;
  min_score: number;
  _destroy?: boolean; //rails remove nested attributes
  quiz_name?: string;
}

export interface AchievementModel {
  id: number;
  user_id: number;
  course_id: number;
  title: string;
  rule: TypeAchievement;
  image: string;
  price: number;
  condition_quizzes: ConditionByQuiz[];
  condition_tasks: ConditionByTask[];
  created_at: string;
  updated_at: string;
}

type AchievementBasicParams = Omit<
  AchievementModel,
  | 'id'
  | 'user_id'
  | 'course_id'
  | 'condition_tasks'
  | 'condition_quizzes'
  | 'created_at'
  | 'updated_at'
  | 'settings'
>;

type AchievementNestedAttributes = {
  condition_quizzes_attributes: Prettify<
    PartialBy<ConditionByQuiz, 'min_score' | 'id'>
  >[];
  condition_tasks_attributes: Prettify<
    PartialBy<ConditionByTask, 'min_score' | 'id'>
  >[];
};

export type AchievementParams = Prettify<
  AchievementBasicParams & AchievementNestedAttributes
>;
