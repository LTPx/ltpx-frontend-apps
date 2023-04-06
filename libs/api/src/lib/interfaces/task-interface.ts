import { PartialBy, Prettify } from './util';

export interface TaskStudentResult {
  task_id: number;
  student_id: number;
  answer: string;
  approved: boolean;
  comments: string[];
  score: number;
}

export interface TaskStudentGrade {
  id: number;
  approved: boolean;
  comments: string[];
}

export interface TaskModel {
  id: number;
  course_id: number;
  title: string;
  description: string;
  student_task?: TaskStudentResult;
  created_at: string;
  updated_at: string;
}

export interface TaskStudent {
  title?: string;
  description?: string;
  task_id: number;
  answer: string;
  file?: any;
}

export type NewTaskParams = Prettify<
  PartialBy<TaskModel, 'id' | 'created_at' | 'updated_at' | 'course_id'>
>;
