export enum TypeQuiz {
  multiple = 'multiple',
  single = 'single',
  answer = 'answer',
  conditional = 'conditional',
}

export interface QuizModel {
  id: number;
  user_id: number;
  course_id: number;
  name: string;
  questions: QuestionQuiz[];
  created_at: string;
  updated_at: string;
}

export type Quiz = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'course_id'
>;

export interface QuestionQuiz {
  question: string;
  description: string;
  kind: TypeQuiz;
  answers: Answer[];
}

interface Answer {
  text: string;
  correct: boolean;
}
