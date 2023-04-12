import { PartialBy, PartialWithRequired, Prettify } from "./util";

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
  questions_attributes: QuestionQuiz[];
  time_minutes_to_answer?: number;
  max_attempts?: number;
  approve_score?: number;
  created_at: string;
  updated_at: string;
}

type NewQuestions = {
  questions_attributes: Prettify<
    PartialWithRequired<
      QuestionQuiz,
      'id'
    >[]
  >;
};

export type QuizBasicParams = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at' | 'course_id' | 'questions'
>;

export type QuizParams = Prettify<
  PartialBy<QuizBasicParams, 'id'> & NewQuestions
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
  question: string;
  description: string;
  kind: TypeQuestionQuiz;
  answers_attributes: AnswerModel[];
  _destroy?: boolean; //rails needs destroy to remove nested attributes
  points: number;
}

export interface AnswerModel {
  id: number;
  text: string;
  correct: boolean;
  question_id: number;
  _destroy?: boolean; //rails needs destroy to remove nested attributes
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
  in_review: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuizResultReview {
  id: number;
  score: number;
  submitted_at: string;
  quiz: QuizModel;
  user_answers?: AnswerModel[];
}

export interface QuizResultSummary {
  id: number;
  quiz: QuizModel;
  score: number;
  in_review: boolean;
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
  approve_score: number;
  last_quiz_result: {
    id: number,
    score: number,
    in_review: boolean
  }
}
