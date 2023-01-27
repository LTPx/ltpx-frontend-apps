import { AchievementModel } from './achievement-interface';
import { QuizModel } from './quiz-interface';
import { PartialWithRequired } from './util';

export enum TeacherClassType {
  none = 'none',
  mandatory = 'mandatory',
  flexible = 'flexible',
  customize = 'customize',
}

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
  cover: any;
  cover_url: string;
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
  quizzes?: QuizModel[];
  achievements?: AchievementModel[];
}

export type PublicCourse = Omit<
  CourseModel,
  'user_id' | 'created_at' | 'updated_at' | 'approved' | 'status' | 'cover_url'
>;

export type TeacherCourse = Omit<CourseModel, 'user_id' | 'cover'>;

export type CourseApiParams = PartialWithRequired<
  TeacherCourse,
  'title'
>;

export const CLASSROOM_MANDATORY = {
  value: TeacherClassType.mandatory,
  title: 'CLASES POR VIDEOCÁMARA OBLIGATORIAS',
  text: 'Este curso incluirá clases para los estudiantes',
  icon: 'person-video',
};

export const CLASSROOM_FLEXIBLE = {
  value: TeacherClassType.flexible,
  title: 'CLASES POR VIDEOCÁMARA NO OBLIGATORIAS',
  text: 'Este curso incluirá clases para los estudiantes',
  icon: 'person-video',
};

export const CLASSROOM_CUSTOMIZE = {
  value: TeacherClassType.customize,
  title: 'CLASES PERSONALIZADAS',
  text: 'Este curso se acuerda con el estudiante hora y días en las que se dictaran las clases',
  icon: 'sliders',
};

export const CLASSROOM_NONE = {
  value: TeacherClassType.none,
  title: 'NO SE REQUIERE CLASES',
  text: 'Este curso no requiere de clases para que los estudiante apruebe este curso',
  icon: 'forbidden',
};

export const CLASSROOMS = {
  mandatory: CLASSROOM_MANDATORY,
  flexible: CLASSROOM_FLEXIBLE,
  customize: CLASSROOM_CUSTOMIZE,
  none: CLASSROOM_NONE,
  classes: CLASSROOM_NONE,
}
