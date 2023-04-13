import { PartialBy, Prettify } from './util';

export interface TaskStudentResult {
  id: number;
  task_id: number;
  student_id: number;
  answer: string;
  status: string;
  file_url?: any;
  comments: string[];
  score: number;
  task: {
    title: string;
    description: string;
    file_url?: any;
  };
}

export interface TaskStudentGrade {
  id: number;
  status: string;
  comments: string[];
}

export interface TaskModel {
  id: number;
  course_id: number;
  title: string;
  file_url?: any;
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
  id?: number
  status?: 'review' | 'rejected' | 'approved'
}

export type NewTaskParams = Prettify<
  PartialBy<TaskModel, 'id' | 'created_at' | 'updated_at' | 'course_id'>
>;
