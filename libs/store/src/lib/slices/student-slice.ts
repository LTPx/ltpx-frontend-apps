import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  Classroom,
  formatErrors,
  getStudentAchievements,
  getStudentClasses,
  getStudentCourse,
  getStudentCourses,
  getStudentPayments,
  getStudentQuiz,
  getStudentQuizResult,
  getStudentQuizzes,
  getStudentStatists,
  getStudentTask,
  getStudentTasks,
  Purchase,
  QuizModel,
  StudentCourse,
  studentEvaluateQuiz,
  studentSendTask,
  TaskModel,
  TaskStudent,
  UserAnswer,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type StudentSlice = {
  purchases: Purchase[];
  enrolledCourses: StudentCourse[];
  enrolledCourse: StudentCourse;
  allTasks: TaskModel[];
  studentClasses: Classroom[];
  currentQuiz: QuizModel;
  studentDashboard: {
    approved_courses: number,
    progress_courses: number,
    completed_quizzes: number,
    total_achievements: number,
  },
  _getStudentPayments: () => Promise<TResponse>;
  _getStudentCourses: () => Promise<TResponse>;
  _getStudentCourse: (slug: string) => Promise<TResponse>;
  _getStudentClasses: () => Promise<TResponse>;
  _getStudentQuizzes: (courseId: number) => Promise<TResponse>;
  _getStudentQuiz: (courseId: number, quizId: number) => Promise<TResponse>;
  _getStudentQuizResult: (quizResultId: number) => Promise<TResponse>;
  _evaluateQuiz: (quizId: number, answers: UserAnswer[], needReview?: boolean) => Promise<TResponse>;
  _getStudentAchievements: (courseId: number) => Promise<TResponse>;
  _getStudentTasks: (courseId: number) => Promise<TResponse>;
  _getStudentTask: (courseId: number, taskId: number) => Promise<TResponse>;
  _sendTask: (params: TaskStudent) => Promise<TResponse>;
  _getStudentStatists: ()  => Promise<TResponse>;
};

export const createStudentSlice: StateCreator<StoreState, [], [], StudentSlice> = (
  set,
  get
) => ({
  purchases: [],
  enrolledCourses: [],
  enrolledCourse: {} as StudentCourse,
  studentClasses: [],
  allTasks: [],
  currentQuiz: {} as QuizModel,
  studentDashboard: {
    approved_courses: 0,
    progress_courses: 0,
    completed_quizzes: 0,
    total_achievements: 0,
  },
  _getStudentPayments: async () => {
    try {
      const purchases = await getStudentPayments();
      set({purchases});
      return { success: true, data: purchases };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentCourses: async () => {
    try {
      const courses = await getStudentCourses();
      set({enrolledCourses: courses});
      return { success: true, data: courses };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentCourse: async (slug) => {
    try {
      const course = await getStudentCourse(slug);
      set({enrolledCourse: course});
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentClasses: async () => {
    try {
      const classes = await getStudentClasses();
      set({studentClasses: classes});
      return { success: true, data: classes };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentQuizzes: async (courseId) => {
    try {
      const quizzes = await getStudentQuizzes(courseId);
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentQuiz: async (courseId, quizId) => {
    try {
      const quiz = await getStudentQuiz(courseId, quizId);
      set({currentQuiz: quiz});
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentQuizResult: async (id) => {
    try {
      const quiz = await getStudentQuizResult(id);
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _evaluateQuiz: async (id, answers, needReview) => {
    try {
      const quiz = await studentEvaluateQuiz(id, answers, needReview);
      return { success: true, data: quiz };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentAchievements: async (courseId) => {
    try {
      const achievements = await getStudentAchievements(courseId);
      return { success: true, data: achievements };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentTasks: async (courseId) => {
    try {
      const tasks = await getStudentTasks(courseId);
      set({allTasks: tasks})
      return { success: true, data: tasks };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentTask: async (courseId, taskId) => {
    try {
      const task = await getStudentTask(courseId, taskId);
      return { success: true, data: task };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _sendTask: async (params) => {
    try {
      const task = await studentSendTask(params);
      const tasks = get().allTasks;
      const tasksUpdated = tasks.map((taskStore) => {
        if (taskStore.id == task.task_id) {
          return {...taskStore, ...{student_task: task}}
        } else {
          return taskStore
        }
      })
      set({ allTasks: tasksUpdated });
      return { success: true, data: task };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _getStudentStatists:  async () => {
    try {
      const data = await getStudentStatists();
      set({ studentDashboard: {
        approved_courses: data.approved_courses,
        progress_courses: data.progress_courses,
        completed_quizzes: data.completed_quizzes,
        total_achievements: data.total_achievements,
      } });
      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
});
