export enum TypeQuestionQuiz {
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
  description?: string;
  questions: QuestionQuiz[];
  created_at: string;
  updated_at: string;
}

export type NewQuizParams = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'course_id'
>;

export type NewQuizApiParams = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'course_id'
>;

export type EditQuizApiParams = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at'
>;

export interface QuestionQuiz {
  question: string;
  description: string;
  kind: TypeQuestionQuiz;
  answers: Answer[];
}

interface Answer {
  text: string;
  correct: boolean;
}