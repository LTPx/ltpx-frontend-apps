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
  id?: string;
  number?: string;
  question: string;
  description: string;
  kind: TypeQuestionQuiz;
  answers: AnswerModel[];
}

export interface AnswerModel {
  id: number;
  text: string;
  correct: boolean;
  question_id: number;
}

export interface UserAnswer {
  text?: string;
  answer_id: number;
  question_id: number;
  user_id?: number;
}

export interface QuizResult {
  id: number;
  name: string;
  quiz_id: number;
  user_id: number;
  score: number;
  total_correct_answer: number;
  total_incorrect_answer: number;
  total_no_answer: number;
  created_at: string;
  updated_at: string;
}

export interface QuizResultSummary {
  id: number;
  quiz: QuizModel;
  score: number;
  submitted_at: string;
  user_answers: {
    answer_id: number;
    id: number
  }[]
}

export interface QuizStudent {
  id: number;
  user_id: number;
  course_id: number;
  name: string;
  total_questions: number;
  quizzes_results_ids: number[];
  last_quiz_result: {
    id: number,
    score: number
  }
}
