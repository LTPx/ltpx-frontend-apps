import { _http } from '../../http';
import { QuizModel } from '../../interfaces/quiz-interface';

const http = _http;

export const getStudentQuiz = async (id: number) => {
  return new Promise<QuizModel>((resolve, reject) => {
    http
      .get(`api/v1/student/quizzes/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
