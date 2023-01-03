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
}

export interface INewCourse {
  cover?: string;
  title: string;
  description: string;
  category: string;
  language: string;
  learn_goals: string;
  requirements: string;
}
