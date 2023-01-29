import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  ContentCourse,
  QuizModel,
  AchievementModel,
  Classroom,
  getTeacherCourse,
  TeacherCourse,
  editCourse,
} from '@ltpx-frontend-apps/api';

type TResponse = {
  success: boolean;
  data?: any;
  error?: Error;
};

export type CourseSlice = {
  loadedCourse: boolean,
  course: TeacherCourse;
  contents: ContentCourse[];
  quizzes: QuizModel[];
  achievements: AchievementModel[];
  classroom: Partial<Classroom>;
  getCourse: (id: number) => Promise<TResponse>;
  addNewContent: (content: ContentCourse) => void;
  removeContent: (index: number) => void;
  addNewQuiz: (quiz: QuizModel) => void;
  removeQuiz: (index: number) => void;
  addNewAchievement: (achievement: AchievementModel) => void;
  removeAchievement: (index: number) => void;
  addClassroom: (classroom: Classroom) => void;
  updateClassroom: (classroom: Classroom) => void;
};

export const createCourseSlice: StateCreator<
  StoreState,
  [],
  [],
  CourseSlice
> = (set, get) => ({
  loadedCourse: false,
  course: {} as TeacherCourse,
  contents: [],
  quizzes: [],
  achievements: [],
  classroom: {},
  getCourse: async (id: number) => {
    try {
      set({loadedCourse: false});
      const course = await getTeacherCourse(id);
      const { contents, quizzes, achievements, classroom } = course;
      set({
        course,
        contents,
        quizzes,
        achievements,
        classroom,
        loadedCourse: true
      });
      return { success: true, data: course };
    } catch (error) {
      set({loadedCourse: true});
      return { success: false, data: error };
    }
  },
  addNewContent: async(content: ContentCourse) => {
    try {
      const courseStore = get().course;
      const contents = courseStore.contents.concat([content]);
      const courseUpdated = {...courseStore, ...{contents}};
      await editCourse(courseUpdated);
      set({ course: courseUpdated });
    } catch (error) {
      console.log(error);
    }
  },
  removeContent: (index: number) => {
    let contents = get().contents;
    contents.slice(index, 1);
    set({ contents });
  },
  addNewQuiz: (quiz: QuizModel) => {
    const quizzes = get().quizzes.concat([quiz]);
    set({ quizzes });
  },
  removeQuiz: (index: number) => {
    let quizzes = get().quizzes;
    quizzes.slice(index, 1);
    set({ quizzes });
  },
  addNewAchievement: (achievement: AchievementModel) => {
    const achievements = get().achievements.concat([achievement]);
    set({ achievements });
  },
  removeAchievement: (index: number) => {
    let achievements = get().achievements;
    achievements.slice(index, 1);
    set({ achievements });
  },
  addClassroom: (classroom: Classroom) => {
    set({ classroom });
  },
  updateClassroom: (classroom: Classroom) => {
    set({ classroom });
  },
});
