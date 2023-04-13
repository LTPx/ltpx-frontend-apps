import {
  teacherGetCourseStudents,
  teacherGetStudentQuizzes,
  teacherGetStudentAchievements,
  teacherGetStudentTasks,
  teacherGradeTask,
  TaskStudentGrade,
  teacherGradeQuiz,
  teacherFeedbackQuiz,
  UserAnswer,
} from '@ltpx-frontend-apps/api';
import { StateCreator } from 'zustand';
import { StoreState } from '../store';

type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type CourseStudentsSlice = {
  _getStudentsByCourse: (courseId: number) => Promise<TResponse>;
  _getStudentQuizzesByCourse: (
    courseId: number,
    studentId: number
  ) => Promise<TResponse>;
  _getStudentAchievementsByCourse: (
    courseId: number,
    studentId: number
  ) => Promise<TResponse>;
  _getStudentTasksByCourse: (
    courseId: number,
    studentId: number
  ) => Promise<TResponse>;
  _teacherGradeTask: (
    studentTaskId: number,
    params: TaskStudentGrade
  ) => Promise<TResponse>;
  _teacherGradeQuiz: (
    quizResultId: number,
    answers: UserAnswer[],
    feedback: string
  ) => Promise<TResponse>;
  _teacherFeedbackQuiz: (
    quizResultId: number,
    feedback: string
  ) => Promise<TResponse>;
};

export const createCourseStudentsSlice: StateCreator<
  StoreState,
  [],
  [],
  CourseStudentsSlice
> = (set, get) => ({
  _getStudentsByCourse: async (courseId) => {
    try {
      const students = await teacherGetCourseStudents(courseId);
      return { success: true, data: students };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentQuizzesByCourse: async (courseId, studentId) => {
    try {
      const quizzes = await teacherGetStudentQuizzes(courseId, studentId);
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentAchievementsByCourse: async (courseId, studentId) => {
    try {
      const quizzes = await teacherGetStudentAchievements(courseId, studentId);
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getStudentTasksByCourse: async (courseId, studentId) => {
    try {
      const tasks = await teacherGetStudentTasks(courseId, studentId);
      return { success: true, data: tasks };
    } catch (error) {
      return { success: false, error };
    }
  },
  _teacherGradeTask: async (studentTaskId, params) => {
    try {
      const task = await teacherGradeTask(studentTaskId, params);
      return { success: true, data: task };
    } catch (error) {
      return { success: false, error };
    }
  },
  _teacherGradeQuiz: async (studentTaskId, answers, feedback) => {
    try {
      const quiz = await teacherGradeQuiz(studentTaskId, answers, feedback);
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error };
    }
  },
  _teacherFeedbackQuiz: async (studentTaskId, feedback) => {
    try {
      const quiz = await teacherFeedbackQuiz(studentTaskId, feedback);
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error };
    }
  },
});
