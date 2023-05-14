import { _http } from '../../http';
import { AchievementModel } from '../../interfaces/achievement-interface';
import { CourseModel, Student } from '../../interfaces/course-interface';
import { QuizResult, UserAnswer } from '../../interfaces/quiz-interface';
import { TaskStudent, TaskStudentGrade } from '../../interfaces/task-interface';

const http = _http;

export const teacherGetCourseStudents = async (courseId: number) => {
  return new Promise<{course: CourseModel, students: Student[]}>((resolve, reject) => {
    http
      .get(`api/v1/teacher/course_sessions/${courseId}/students`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const teacherGetStudentQuizzes = async (courseId: number, studentId: number) => {
  return new Promise<QuizResult[]>((resolve, reject) => {
    http
      .get(`/api/v1/teacher/course_sessions/${courseId}/students/${studentId}/quizzes`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const teacherGetStudentAchievements = async (courseId: number, studentId: number) => {
  return new Promise<AchievementModel[]>((resolve, reject) => {
    http
      .get(`/api/v1/teacher/course_sessions/${courseId}/students/${studentId}/achievements`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const teacherGetStudentTasks = async (courseId: number, studentId: number) => {
  return new Promise<TaskStudent[]>((resolve, reject) => {
    http
      .get(`/api/v1/teacher/course_sessions/${courseId}/students/${studentId}/tasks`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const teacherGradeTask = async (studentTaskId: number, params: TaskStudentGrade) => {
  return new Promise<TaskStudent[]>((resolve, reject) => {
    http
      .put(`/api/v1/teacher/student_tasks/${studentTaskId}/grade`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const teacherGradeQuiz = async (quizResultId: number, answers: UserAnswer[], feedback:string) => {
  return new Promise<TaskStudent[]>((resolve, reject) => {
    http
      .put(`/api/v1/teacher/quiz_results/${quizResultId}/grade`, {teacher_answers: answers, feedback})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const teacherFeedbackQuiz = async (quizResultId: number, feedback:string) => {
  return new Promise<TaskStudent[]>((resolve, reject) => {
    http
      .put(`/api/v1/teacher/quiz_results/${quizResultId}/feedback`, {feedback})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getQuizReview = async (quizId: number) => {
  return new Promise<any>((resolve, reject) => {
    http
      .get(`api/v1/teacher/quiz_results/${quizId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
