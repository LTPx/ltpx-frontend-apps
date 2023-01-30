import { _http } from '../../http';
import { EditQuizParams, NewQuizParams, QuizModel } from '../../interfaces/quiz-interface';

const http = _http;

export const createQuiz = async (quiz: NewQuizParams) => {
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

export const editQuiz = async (quiz: EditQuizParams) => {
  const { id } = quiz;
  return new Promise<QuizModel>((resolve, reject) => {
    http
      .put(`api/v1/teacher/quizzes/${id}`, quiz)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeQuiz = async (id: number) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`api/v1/teacher/quizzes/${id}`)
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
