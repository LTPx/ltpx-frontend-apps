import { _http } from '../../http';
import { QuizModel, QuizResult, QuizResultSummary, QuizStudent, QuizStudentResult, UserAnswer } from '../../interfaces/quiz-interface';

const http = _http;

export const getStudentQuizzes = async (courseId: number) => {
  return new Promise<QuizStudent[]>((resolve, reject) => {
    http
      .get(`/api/v1/student/courses/${courseId}/quizzes`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStudentQuiz = async (courseId: number, quizId: number) => {
  return new Promise<QuizModel>((resolve, reject) => {
    http
      .get(`/api/v1/student/courses/${courseId}/quizzes/${quizId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStudentQuizResult = async (quizId: number) => {
  return new Promise<QuizStudentResult>((resolve, reject) => {
    http
      .get(`api/v1/student/quiz_results/${quizId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const studentEvaluateQuiz = async (id: number, answers: UserAnswer[], needReview?: boolean) => {
  const params = { quiz_id: id, user_answers_attributes: answers, in_review: !!needReview };
  return new Promise<QuizResult>((resolve, reject) => {
    http
      .post(`api/v1/student/quiz_results`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

