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
} from '@ltpx-frontend-apps/api';

type TResponse = {
  success: boolean;
  data?: any;
  error?: Error;
};

export type CourseSlice = {
  loadedCourse: boolean;
  course: TeacherCourse;
  getCourse: (id: number) => Promise<TResponse>;
  addNewContent: (content: ContentCourse) => void;
  addNewQuiz: (quiz: NewQuizParams) => void;
  addNewAchievement: (achievement: NewAchievementParams) => void;
  removeContent: (index: number) => void;
  removeQuiz: (id: number) => void;
  removeAchievement: (id: number) => void;
  addUpdateClassroom: (classroom: Classroom) => void;
  updateQuiz: (quiz: EditQuizParams) => void;
};

export const createCourseSlice: StateCreator<
  StoreState,
  [],
  [],
  CourseSlice
> = (set, get) => ({
  loadedCourse: false,
  course: {} as TeacherCourse,
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
      return { success: false, data: error };
    }
  },
  addNewContent: async (content: ContentCourse) => {
    try {
      const courseStore = get().course;
      const contents = courseStore.contents.concat([content]);
      const courseUpdated = { ...courseStore, ...{ contents } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
    } catch (error) {
      console.log(error);
    }
  },
  removeContent: async (index: number) => {
    let contents = get().course.contents;
    contents.splice(index, 1);
    const courseStore = get().course;
    const courseUpdated = { ...courseStore, ...{ contents } };
    await editCourse(courseUpdated);
    set({ course: courseUpdated });
  },
  addNewQuiz: async (params: NewQuizParams) => {
    try {
      const course = get().course;
      const paramsCourseId = {...params, ...{course_id: course.id}};
      const quiz = await createQuiz(paramsCourseId);
      const quizzes = course.quizzes?.concat([quiz]);
      const courseUpdated = { ...course, ...{ quizzes } };
      set({ course: courseUpdated });
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  removeQuiz: async (id: number) => {
    try {
      const courseStore = get().course;
      const quizzes = courseStore.quizzes?.filter((quiz) => quiz.id !== id);
      const courseUpdated = { ...courseStore, ...{ quizzes } };
      await removeQuiz(id);
      set({ course: courseUpdated });
    } catch (error) {
      console.log(error);
    }
  },
  addNewAchievement: async (params: NewAchievementParams) => {
    try {
      const course = get().course;
      const paramsCourseId = {...params, ...{course_id: course.id}};
      const achievement = await createAchievement(paramsCourseId);
      const achievements = course.achievements?.concat([achievement]);
      const courseUpdated = { ...course, ...{ achievements } };
      set({ course: courseUpdated });
      return { success: true, data: achievement };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  removeAchievement: async (id: number) => {
    try {
      const courseStore = get().course;
      const achievements = courseStore.achievements?.filter(
        (achievement) => achievement.id !== id
      );
      const courseUpdated = { ...courseStore, ...{ achievements } };
      await removeAchievement(id);
      set({ course: courseUpdated });
    } catch (error) {
      console.log(error);
    }
  },
  addUpdateClassroom: async (classroom: Classroom) => {
    try {
      const courseStore = get().course;
      const courseUpdated = { ...courseStore, ...{ classroom } };
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
    } catch (error) {
      console.log(error);
    }
  },
  updateQuiz: async (params: EditQuizParams) => {
    try {
      const course = get().course;
      const paramsCourseId = {...params, ...{ course_id: course.id }};
      const quiz = await editQuiz(paramsCourseId);
      const quizzes = course.quizzes?.map((quizStore)=> {
        return quizStore.id === quiz.id ? quiz : quizStore
      });
      const courseUpdated = { ...course, ...{ quizzes } };
      set({ course: courseUpdated });
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: true, data: error };
    }
  }
});
