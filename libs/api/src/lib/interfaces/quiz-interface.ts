import { PartialBy } from "./util";

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
  questions: QuestionQuiz[];
  time_minutes_to_answer?: number;
  max_attempts?: number;
  total_questions_to_approved?: number;
  created_at: string;
  updated_at: string;
}

export type NewQuizParams = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'course_id'
>;

export type EditQuizParams = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at' | 'course_id'
>;

export type QuizParamsUi = PartialBy<
  EditQuizParams,
  'id'
>;
export interface QuestionQuiz {
  question: string;
  description: string;
  kind: TypeQuestionQuiz;
  answers: Answer[];
}

export interface Answer {
  text: string;
  correct: boolean;
  id?: number; //should update all components support id
  question_id?: number; //should update all components support id
}

export interface UserAnswer {
  text?: string;
  answer_id: number;
  question_id: number;
}
