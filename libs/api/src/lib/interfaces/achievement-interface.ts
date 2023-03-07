import { PartialWithRequired, Prettify } from './util';

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

export interface Condition {
  id: number;
  points_to_assign: number;
  entity: EntityAchievement;
  entity_id: number;
  must_reach_value: number;
  description?: string;
  _destroy?: boolean; //rails needs destroy to remove nested attributes
}

export interface AchievementModel {
  id: number;
  user_id: number;
  course_id: number;
  title: string;
  rule: TypeAchievement;
  image: string;
  price: number;
  conditions_attributes: Condition[];
  points_needed: number;
  created_at: string;
  updated_at: string;
}

type AchievementBasicParams = Omit<
  AchievementModel,
  | 'id'
  | 'user_id'
  | 'course_id'
  | 'points_needed'
  | 'conditions_attributes'
  | 'created_at'
  | 'updated_at'
  | 'settings'
>;

type NewConditions = {
  conditions_attributes: Prettify<
    PartialWithRequired<
      Condition,
      'entity' | 'entity_id' | 'must_reach_value' | 'points_to_assign'
    >[]
  >;
};

export type AchievementParams = Prettify<
  AchievementBasicParams & NewConditions
>;

export interface ConditionCompleted {
  id: number;
  points: number;
  condition_id: number;
  entity_id: number;
}

export interface AchievementsStudentResponse {
  course_achievements: AchievementModel[];
  conditions_completed: ConditionCompleted[];
}
