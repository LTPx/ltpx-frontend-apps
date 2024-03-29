import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  ContentCourse,
  Classroom,
  getTeacherCourse,
  TeacherCourse,
  editCourse,
  _removeQuiz,
  _removeAchievement,
  createAchievement,
  AchievementParams,
  createQuiz,
  editQuiz,
  editAchievement,
  CourseApiParams,
  NewCourseSessionParams,
  createCourseSession,
  NewTaskParams,
  createTask,
  QuizParams,
  formatErrors,
  editTask,
  removeTask,
  editSession,
  EditSessionParams,
  getAllCategories,
  FormatResponse,
} from '@ltpx-frontend-apps/api';

export type CourseSlice = {
  loadedCourse: boolean;
  course: TeacherCourse;
  allCategories: {
    text: string;
    value: string;
  }[];
  cleanCourse: () => void;
  getCourse: (id: number) => Promise<FormatResponse>;
  addNewContent: (content: ContentCourse) => Promise<FormatResponse>;
  removeContent: (index: number) => Promise<FormatResponse>;
  addUpdateClassroom: (classroom: Classroom) => Promise<FormatResponse>;
  updateContent: (
    content: ContentCourse,
    index: number
  ) => Promise<FormatResponse>;
  _addQuiz: (quiz: QuizParams) => Promise<FormatResponse>;
  _addAchievement: (achievement: AchievementParams) => Promise<FormatResponse>;
  _removeQuiz: (id: number) => Promise<FormatResponse>;
  _removeAchievement: (id: number) => Promise<FormatResponse>;
  _updateQuiz: (quiz: QuizParams) => Promise<FormatResponse>;
  _updateAchievement: (
    achievement: AchievementParams,
    id: number
  ) => Promise<FormatResponse>;
  _updateCourse: (course: CourseApiParams) => Promise<FormatResponse>;
  _addCourseSession: (
    params: NewCourseSessionParams
  ) => Promise<FormatResponse>;
  _editCourseSession: (params: EditSessionParams) => Promise<FormatResponse>;
  _addTask: (courseId: number, task: NewTaskParams) => Promise<FormatResponse>;
  _updateTask: (
    courseId: number,
    task: NewTaskParams
  ) => Promise<FormatResponse>;
  _removeTask: (id: number, taskId: number) => Promise<FormatResponse>;
  _getAllCategories: () => Promise<FormatResponse>;
};

export const createCourseSlice: StateCreator<
  StoreState,
  [],
  [],
  CourseSlice
> = (set, get) => ({
  loadedCourse: false,
  course: {} as TeacherCourse,
  allCategories: [],
  getCourse: async (id: number) => {
    try {
      set({ loadedCourse: false });
      const course = await getTeacherCourse(id);
      set({
        course,
        loadedCourse: true,
      });
      return { success: true, data: course };
    } catch (error) {
      set({ loadedCourse: true });
      return { success: false, error };
    }
  },
  addNewContent: async (content: ContentCourse) => {
    try {
      const courseStore = get().course;
      const contents = courseStore.contents.concat([content]);
      const courseUpdated = { ...courseStore, ...{ contents } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
      return { success: true, data: contents };
    } catch (error) {
      return { success: false, error };
    }
  },
  removeContent: async (index: number) => {
    try {
      const contents = get().course.contents;
      contents.splice(index, 1);
      const courseStore = get().course;
      const courseUpdated = { ...courseStore, ...{ contents } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
      return { success: true, data: contents };
    } catch (error) {
      return { success: false, error };
    }
  },
  _addQuiz: async (params: QuizParams) => {
    try {
      const course = get().course;
      const paramsCourseId = { ...params, ...{ course_id: course.id } };
      const quiz = await createQuiz(paramsCourseId);
      const quizzes = course.quizzes?.concat([quiz]);
      const courseUpdated = { ...course, ...{ quizzes } };
      set({ course: courseUpdated });
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _removeQuiz: async (id: number) => {
    try {
      const courseStore = get().course;
      const quizzes = courseStore.quizzes?.filter((quiz) => quiz.id !== id);
      const courseUpdated = { ...courseStore, ...{ quizzes } };
      await _removeQuiz(id);
      set({ course: courseUpdated });
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _addAchievement: async (params) => {
    try {
      const course = get().course;
      const paramsCourseId = { ...params, ...{ course_id: course.id } };
      const achievement = await createAchievement(paramsCourseId);
      const achievements = course.achievements?.concat([achievement]);
      const courseUpdated = { ...course, ...{ achievements } };
      set({ course: courseUpdated });
      return { success: true, data: achievement };
    } catch (error) {
      return { success: false, error };
    }
  },
  _removeAchievement: async (id: number) => {
    try {
      const courseStore = get().course;
      const achievements = courseStore.achievements?.filter(
        (achievement) => achievement.id !== id
      );
      const courseUpdated = { ...courseStore, ...{ achievements } };
      await _removeAchievement(id);
      set({ course: courseUpdated });
      return { success: true, data: achievements };
    } catch (error) {
      return { success: false, error };
    }
  },
  addUpdateClassroom: async (classroom: Classroom) => {
    try {
      const courseStore = get().course;
      const courseUpdated = { ...courseStore, ...{ classroom } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
      return { success: true, data: classroom };
    } catch (error) {
      return { success: false, error };
    }
  },
  _updateQuiz: async (params: QuizParams) => {
    try {
      const course = get().course;
      const paramsCourseId = { ...params, ...{ course_id: course.id } };
      const quiz = await editQuiz(paramsCourseId);
      const quizzes = course.quizzes?.map((quizStore) => {
        return quizStore.id === quiz.id ? quiz : quizStore;
      });
      const courseUpdated = { ...course, ...{ quizzes } };
      set({ course: courseUpdated });
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  updateContent: async (content: ContentCourse, index: number) => {
    try {
      const courseStore = get().course;
      const contents = courseStore.contents?.map((contentStore, i) => {
        return i === index ? content : contentStore;
      });
      const courseUpdated = { ...courseStore, ...{ contents } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
      return { success: true, data: contents };
    } catch (error) {
      return { success: false, error };
    }
  },
  _updateAchievement: async (params, id) => {
    try {
      const course = get().course;
      const paramsAchievementId = { ...params, ...{ course_id: course.id } };
      const achievement = await editAchievement(paramsAchievementId, id);
      const achievements = course.achievements?.map((achievementStore) => {
        return achievementStore.id === achievement.id
          ? achievement
          : achievementStore;
      });
      const courseUpdated = { ...course, ...{ achievements } };
      set({ course: courseUpdated });
      return { success: true, data: achievements };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _updateCourse: async (params: CourseApiParams) => {
    try {
      const courseStore = get().course;
      const updatedCourse = { ...courseStore, ...params };
      await editCourse(updatedCourse);
      set({ course: updatedCourse });
      return { success: true, data: updatedCourse };
    } catch (error) {
      return { success: false, error };
    }
  },
  _addCourseSession: async (params) => {
    try {
      const course = get().course;
      const paramsWithId = { ...params, ...{ course_id: course.id } };
      const session = await createCourseSession(paramsWithId);
      const updatedCourse = { ...course, ...{ session } };
      set({ course: updatedCourse });
      return { success: true, data: session };
    } catch (error) {
      return { success: false, error };
    }
  },
  _editCourseSession: async (params) => {
    let meetings;
    try {
      const course = get().course;
      const paramsData = {
        ...params,
        ...{
          course_id: course.id,
          meetings_attributes: meetings ? meetings : params.meetings_attributes,
        },
      };
      const session = await editSession(paramsData);
      const updatedCourse = { ...course, ...{ session } };
      set({ course: updatedCourse });
      return { success: true, data: session };
    } catch (error) {
      return { success: false, error };
    }
  },
  _addTask: async (courseId, params) => {
    try {
      const task = await createTask(courseId, params);
      const tasks = get().course.tasks;
      const allTasks = tasks.concat([task]);
      const course = get().course;
      const updatedCourse = {
        ...course,
        ...{
          tasks: allTasks,
        },
      };
      set({ course: updatedCourse });
      return { success: true, data: task };
    } catch (error) {
      return { success: false, error };
    }
  },
  cleanCourse: () => {
    set({ course: {} as TeacherCourse });
  },
  _updateTask: async (id, params) => {
    try {
      const courseStore = get().course;
      const paramsTaskId = { ...params, ...{ course_id: courseStore.id } };
      const task = await editTask(id, paramsTaskId);
      const tasks = courseStore.tasks?.map((taskStore) => {
        return taskStore.id === task.id ? task : taskStore;
      });
      const courseUpdated = { ...courseStore, ...{ tasks } };
      set({ course: courseUpdated });
      return { success: true, data: tasks };
    } catch (error) {
      return { success: false, error: formatErrors(error) };
    }
  },
  _removeTask: async (courseId, taskId) => {
    try {
      await removeTask(courseId, taskId);
      const tasks = get().course.tasks;
      const updatedTasks = tasks.filter((task) => {
        return task.id !== taskId;
      });
      const course = get().course;
      const updatedCourse = {
        ...course,
        ...{
          tasks: updatedTasks,
        },
      };
      set({ course: updatedCourse });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },
  _getAllCategories: async () => {
    try {
      const categories = await getAllCategories();
      const allCategories = categories.map((category) => {
        return {
          text: category.name,
          value: category.id.toString(),
        };
      });
      const categoriesForSelect = categories.map((category)=>{
        return {
          text: category.name,
          value: category.slug
        }
      });
      set({ allCategories, categoriesForSelect });
      return { success: true, data: categories };
    } catch (error) {
      return { success: false, error };
    }
  },
});
