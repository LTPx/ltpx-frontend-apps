import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  ContentCourse,
  Classroom,
  getTeacherCourse,
  TeacherCourse,
  editCourse,
  removeQuiz,
  removeAchievement,
  createAchievement,
  NewAchievementParams,
  NewQuizParams,
  createQuiz,
  editQuiz,
  EditQuizParams,
  EditAchievementParams,
  editAchievement,
  CourseApiParams,
  NewCourseSessionParams,
  createCourseSession,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: Error;
};

export type CourseSlice = {
  loadedCourse: boolean;
  course: TeacherCourse;
  getCourse: (id: number) => Promise<TResponse>;
  addNewContent: (content: ContentCourse) => Promise<TResponse>;
  addNewQuiz: (quiz: NewQuizParams) => Promise<TResponse>;
  addNewAchievement: (achievement: NewAchievementParams) => Promise<TResponse>;
  removeContent: (index: number) => Promise<TResponse>;
  removeQuiz: (id: number) => Promise<TResponse>;
  removeAchievement: (id: number) => Promise<TResponse>;
  addUpdateClassroom: (classroom: Classroom) => Promise<TResponse>;
  updateContent: (content: ContentCourse, index: number) => Promise<TResponse>;
  updateQuiz: (quiz: EditQuizParams) => Promise<TResponse>;
  updateAchievement: (achievement: EditAchievementParams) => Promise<TResponse>;
  updateCourse: (course: CourseApiParams) => Promise<TResponse>;
  _addCourseSession: (params: NewCourseSessionParams) => Promise<TResponse>;
};

export const createCourseSlice: StateCreator<
  StoreState,
  [],
  [],
  CourseSlice
> = (set, get) => ({
  loadedCourse: false,
  course: {} as TeacherCourse,
  getCourse: async (id: number): Promise<TResponse> => {
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
      return { success: false, data: error };
    }
  },
  addNewContent: async (content: ContentCourse): Promise<TResponse> => {
    try {
      const courseStore = get().course;
      const contents = courseStore.contents.concat([content]);
      const courseUpdated = { ...courseStore, ...{ contents } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
      return { success: true, data: contents };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  removeContent: async (index: number): Promise<TResponse> => {
    try {
      let contents = get().course.contents;
      contents.splice(index, 1);
      const courseStore = get().course;
      const courseUpdated = { ...courseStore, ...{ contents } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
      return { success: true, data: contents };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  addNewQuiz: async (params: NewQuizParams): Promise<TResponse> => {
    try {
      const course = get().course;
      const paramsCourseId = { ...params, ...{ course_id: course.id } };
      const quiz = await createQuiz(paramsCourseId);
      const quizzes = course.quizzes?.concat([quiz]);
      const courseUpdated = { ...course, ...{ quizzes } };
      set({ course: courseUpdated });
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  removeQuiz: async (id: number): Promise<TResponse> => {
    try {
      const courseStore = get().course;
      const quizzes = courseStore.quizzes?.filter((quiz) => quiz.id !== id);
      const courseUpdated = { ...courseStore, ...{ quizzes } };
      await removeQuiz(id);
      set({ course: courseUpdated });
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  addNewAchievement: async (
    params: NewAchievementParams
  ): Promise<TResponse> => {
    try {
      const course = get().course;
      const paramsCourseId = { ...params, ...{ course_id: course.id } };
      const achievement = await createAchievement(paramsCourseId);
      const achievements = course.achievements?.concat([achievement]);
      const courseUpdated = { ...course, ...{ achievements } };
      set({ course: courseUpdated });
      return { success: true, data: achievement };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  removeAchievement: async (id: number): Promise<TResponse> => {
    try {
      const courseStore = get().course;
      const achievements = courseStore.achievements?.filter(
        (achievement) => achievement.id !== id
      );
      const courseUpdated = { ...courseStore, ...{ achievements } };
      await removeAchievement(id);
      set({ course: courseUpdated });
      return { success: true, data: achievements };
    } catch (error) {
      return { success: true, data: error };
    }
  },
  addUpdateClassroom: async (classroom: Classroom): Promise<TResponse> => {
    try {
      const courseStore = get().course;
      const courseUpdated = { ...courseStore, ...{ classroom } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
      return { success: true, data: classroom };
    } catch (error) {
      return { success: true, data: error };
    }
  },
  updateQuiz: async (params: EditQuizParams): Promise<TResponse> => {
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
      return { success: true, data: error };
    }
  },
  updateContent: async (
    content: ContentCourse,
    index: number
  ): Promise<TResponse> => {
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
      return { success: true, data: error };
    }
  },
  updateAchievement: async (
    params: EditAchievementParams
  ): Promise<TResponse> => {
    try {
      const course = get().course;
      const paramsAchievementId = { ...params, ...{ course_id: course.id } };
      const achievement = await editAchievement(paramsAchievementId);
      const achievements = course.achievements?.map((achievementStore) => {
        return achievementStore.id === achievement.id
          ? achievement
          : achievementStore;
      });
      const courseUpdated = { ...course, ...{ achievements } };
      set({ course: courseUpdated });
      return { success: true, data: achievements };
    } catch (error) {
      return { success: true, data: error };
    }
  },
  updateCourse: async (params: CourseApiParams): Promise<TResponse> => {
    try {
      const courseStore = get().course;
      const updatedCourse = { ...courseStore, ...params };
      await editCourse(updatedCourse);
      set({ course: updatedCourse });
      return { success: true, data: updatedCourse };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  _addCourseSession: async (params) => {
    try {
      const course = get().course;
      const paramsWithId = { ...params, ...{ course_id: course.id } };
      const session = await createCourseSession(paramsWithId);
      return { success: true, data: session };
    } catch (error) {
      return { success: false, data: error };
    }
  },
});
