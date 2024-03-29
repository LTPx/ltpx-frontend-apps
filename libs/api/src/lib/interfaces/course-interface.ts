import { AchievementModel } from './achievement-interface';
import { MeetingModel } from './meeting-interface';
import { QuizModel } from './quiz-interface';
import { CourseSession } from './session-interface';
import { TaskModel } from './task-interface';
import { TeacherProfile } from './teacher-interface';
import { PartialWithRequired } from './util';

export enum TeacherClassType {
  none = 'none',
  mandatory = 'mandatory',
  flexible = 'flexible',
  customize = 'customize',
}

export enum CourseStatus {
  publish = 'published',
  review = 'review',
  draft = 'draft',
  rejected = 'rejected'
}

export enum CourseLanguage {
  es = 'es',
  en = 'en',
}

export enum CourseLevel {
  begging = 'begging',
  intermediate = 'intermediate',
  advanced = 'advanced',
  all = 'all'
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
export interface Session {
  meetings: MeetingModel[];
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
  category_slug: string;
  price_currency: string;
  contents_count: number;
  enrollments_count: number;
  price_cents: number;
  price_format: string;
  price: string;
  average_rating: number;
  approved: boolean;
  level: CourseLevel;
  language: CourseLanguage;
  session: CourseSession;
  status: CourseStatus;
  contents: ContentCourse[];
  classroom: Classroom;
  quizzes: QuizModel[];
  achievements?: AchievementModel[];
  course_session_id: number;
  tasks: TaskModel[];
  slug: string;
  teacher?: TeacherProfile;
  admin_comments?: AdminComment[];
}

export interface StudentCourse {
  id: number;
  cover_url: string;
  title: string;
  description: string;
  learn_goals: string;
  requirements: string;
  created_at: string;
  approved: boolean;
  session: CourseSession;
  contents: ContentCourse[];
  course_session_id: number;
  slug: string;
  teacher?: TeacherProfile;
  course_progress: number;
}

export interface AdminComment {
  comment: string;
  created_at: string;
  user_id: number
}

export interface CourseSite {
  id: number;
  cover: any;
  cover_url: string;
  title: string;
  description: string;
  category: string;
  category_slug: string;
  price_currency: string;
  price_cents: number;
  price_format: string;
  price: string;
  average_rating: number;
  language: CourseLanguage;
  total_achievements: number;
  slug: string;
  learn_goals: string[];
  requirements: string[];
  contents: string[];
  level: CourseLevel;
  achievements?: AchievementModel[];
  quizzes?: string[];
  tasks?: string[];
}

export interface Comment {
  name: string;
  image: string;
  title: string;
  comment: string;
  date: string;
}

export interface Rating {
  stars: number;
  reviewers: number;
}

export interface TeacherSummary {
  id: number;
  user_id: number;
  image: string;
  biography: string;
  name: string;
  profession: string;
  total_courses: number;
  rating_average: number;
  total_reviews: number;
  total_students: number;
  profile_image: string;
  profile_video: string;
  skills: string;
  slug: string;
  social_networks: {
    name: string;
    url: string;
  }[];
  courses?: CourseModel[];
}

export interface CourseSessionSummary {
  id: number;
  call_time_min: number;
  enrollments_count: number;
  max_participants: number;
  meetings: {start_date: string}[];
}

export interface FullCourse {
  course: CourseSite;
  session: CourseSessionSummary;
  teacher: TeacherSummary;
  comments: Comment[];
  ratings: Rating[];
}

export type PublicCourse = Omit<
  CourseModel,
  'user_id' | 'created_at' | 'updated_at' | 'approved' | 'status' | 'cover_url'
>;

export type TeacherCourse = Omit<CourseModel, 'user_id' | 'cover'>;

export type CourseApiParams = PartialWithRequired<TeacherCourse, 'title'>;

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
  text: 'Este curso no requiere de clases para que los estudiantes aprueben este curso',
  icon: 'forbidden',
};

export const CLASSROOMS = {
  mandatory: CLASSROOM_MANDATORY,
  flexible: CLASSROOM_FLEXIBLE,
  customize: CLASSROOM_CUSTOMIZE,
  none: CLASSROOM_NONE,
  classes: CLASSROOM_NONE,
};

export interface MeetingDate {
  date: string;
  day_number: string;
  start_time: string;
  end_time: string;
  month: string;
}

export interface ClassroomClasses {
  course_id: number;
  title: string;
  type: TeacherClassType;
  min_participants: number;
  max_participants: number;
  duration: number;
  meetings: MeetingModel[];
}

export interface Student {
  name: string;
  student_id: number;
}
