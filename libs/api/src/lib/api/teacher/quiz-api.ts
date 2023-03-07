import { _http } from '../../http';
import { EditQuizParams, NewQuizParams, QuizModel } from '../../interfaces/quiz-interface';

const http = _http;

export const createQuiz = async (quiz: NewQuizParams) => {
  //TODO: update in submit
  const { questions } = quiz;
  const questionsFormat = questions.map((question)=>{
    const { answers } = question;
    const questionFormat = {...question, ...{answers_attributes: answers}}
    return questionFormat
  })
  const newQuiz = {...quiz, ...{questions_attributes: questionsFormat}};
  return new Promise<QuizModel>((resolve, reject) => {
    http
      .post('api/v1/teacher/quizzes', newQuiz)
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
    //TODO: update in submit
    const { questions } = quiz;
    const questionsFormat = questions.map((question)=>{
      const { answers } = question;
      const questionFormat = {...question, ...{answers_attributes: answers}}
      return questionFormat
    })
  const editQuiz = {...quiz, ...{questions_attributes: questionsFormat}};
  return new Promise<QuizModel>((resolve, reject) => {
    http
      .put(`api/v1/teacher/quizzes/${id}`, editQuiz)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const _removeQuiz = async (id: number) => {
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
