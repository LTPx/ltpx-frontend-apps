import { PartialWithRequired } from './util';

export enum CourseStatus {
  publish = 'published',
  draft = 'draft',
}

export enum CourseLanguage {
  es = 'Spanish',
  en = 'English',
}

export enum CourseLevel {
  begging = 'begging',
  intermediate = 'intermediate',
  advanced = 'advanced',
}

export enum TeacherClassType {
  none = 'none',
  mandatory = 'mandatory',
  flexible = 'flexible',
  customize = 'customize',
}

export interface ContentCourse {
  title: string;
  description: string;
}

export interface Classroom {
  condition: TeacherClassType;
  min: number;
  max: number;
  call_time_min: number;
  meetings: string[];
}

export interface CourseModel {
  id: number;
  user_id: number;
  cover: string;
  title: string;
  description: string;
  learn_goals: string;
  requirements: string;
  created_at: string;
  updated_at: string;
  category: string;
  price_currency: string;
  contents_count: number;
  enrollments_count: number;
  price_cents: number;
  average_rating: number;
  approved: boolean;
  level: CourseLevel;
  language: CourseLanguage;
  status: CourseStatus;
  contents: ContentCourse[];
  classroom: Classroom;
}

export type PublicCourse = Omit<
  CourseModel, "user_id" | "created_at" | "updated_at" | "approved" | "status"
>

export type TeacherCourse = Omit<
  CourseModel, "user_id"
>

export type NewCourseApiParams = PartialWithRequired<
  TeacherCourse,
  'description' | 'title'
>;
