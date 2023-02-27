import { _http } from '../../http';
import { QuizModel, UserAnswer } from '../../interfaces/quiz-interface';

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
export const studentEvaluateQuiz = async (id: number, answers: UserAnswer[]) => {
  const params = { quiz_id: id, user_answers_attributes: answers };
  return new Promise<any>((resolve, reject) => {
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

