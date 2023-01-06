export enum StatusCourse {
  publish = 'published',
  draft = 'draft',
}

export interface IContentCourse {
  title: string;
  description: string;
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
  language: string;
  level: string;
  contents: IContentCourse[];
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
  level: string;
  learn_goals: string;
  requirements: string;
  contents?: ICourseContent[];
  classes?: any;
}
