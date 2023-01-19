import { _http } from '../../http';
import { NewQuizApiParams, QuizModel } from '../../interfaces/quiz-interface';

const http = _http;

export const createQuiz = async (quiz: NewQuizApiParams) => {
  return new Promise<QuizModel>((resolve, reject) => {
    http
      .post('api/v1/teacher/quizzes', quiz)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTeacherQuizzes = async () => {
  return new Promise<QuizModel[]>((resolve, reject) => {
    http
      .get('api/v1/teacher/quizzes')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
