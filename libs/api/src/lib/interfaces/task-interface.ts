import { PartialBy, Prettify } from './util';

export interface TaskModel {
  id: number;
  course_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type NewTaskParams = Prettify<
  PartialBy<TaskModel, 'id' | 'created_at' | 'updated_at' | 'course_id'>
>;
