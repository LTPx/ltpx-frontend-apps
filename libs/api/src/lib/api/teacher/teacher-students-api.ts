import { _http } from '../../http';
import { AchievementModel } from '../../interfaces/achievement-interface';
import { CourseModel, Student } from '../../interfaces/course-interface';
import { QuizResult } from '../../interfaces/quiz-interface';
import { TaskStudent } from '../../interfaces/task-interface';

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
