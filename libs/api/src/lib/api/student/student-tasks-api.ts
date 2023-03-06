import { _http } from '../../http';
import { TaskModel } from '../../interfaces/task-interface';

const http = _http;

export const getStudentTasks = async (courseId: number) => {
  return new Promise<TaskModel[]>((resolve, reject) => {
    http
      .get(`/api/v1/student/courses/${courseId}/tasks`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStudentTask = async (courseId: number, quizId: number) => {
  return new Promise<TaskModel>((resolve, reject) => {
    http
      .get(`/api/v1/student/courses/${courseId}/tasks/${quizId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// export const getStudentQuizResult = async (quizId: number) => {
//   return new Promise<TaskModel>((resolve, reject) => {
//     http
//       .get(`api/v1/student/quiz_results/${quizId}`)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const studentEvaluateQuiz = async (id: number, answers: UserAnswer[]) => {
//   const params = { quiz_id: id, user_answers_attributes: answers };
//   return new Promise<QuizResult>((resolve, reject) => {
//     http
//       .post(`api/v1/student/quiz_results`, params)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

