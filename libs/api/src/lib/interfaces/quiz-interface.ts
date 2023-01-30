export enum TypeQuestionQuiz {
  multiple = 'multiple',
  single = 'single',
  answer = 'answer',
  conditional = 'conditional',
}

export interface QuizModel {
  id: number; // ignore in new but not in edit
  user_id: number;  //ignore in new/edit
  course_id: number; //ignore in new
  name: string;
  questions: QuestionQuiz[];
  created_at: string; //ignore in new/edit
  updated_at: string; //ignore in new/edit
}

export type NewQuizParams = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at' | 'id' | 'course_id'
>;

export type EditQuizParams = Omit<
  QuizModel,
  'user_id' | 'created_at' | 'updated_at' | 'course_id'
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
