export enum StatusCourse {
  publish = 'publish',
  draft = 'draft',
}
export interface ICourse {
  id: string;
  image?: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  duration?: number;
  lessons?: number;
  stars?: number;
  status?: StatusCourse;
  enrollments_count?: number;
}

export interface ICourseContent {
  title: string;
  description: string;
}

export interface INewCourse {
  cover?: string;
  title: string;
  description: string;
  category: string;
  language: string;
  learn_goals: string;
  requirements: string;
  contents?: ICourseContent[];
  classes?: any;
}
