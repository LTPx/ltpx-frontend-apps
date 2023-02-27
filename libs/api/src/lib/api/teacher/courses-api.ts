import { _http } from '../../http';
import { CourseApiParams, TeacherCourse } from '../../interfaces/course-interface';
import { QuizModel } from '../../interfaces/quiz-interface';
import { moveToFormData } from '../../utils';

const http = _http;

export const getTeacherCourses = async () => {
  return new Promise<TeacherCourse[]>((resolve, reject) => {
    http
      .get('api/v1/teacher/courses')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createCourse = async (course: CourseApiParams) => {
  return new Promise<TeacherCourse>((resolve, reject) => {
    const data = moveToFormData(course);
    http
      .post('api/v1/teacher/courses', data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editCourse = async (course: CourseApiParams) => {
  return new Promise<TeacherCourse>((resolve, reject) => {
    const { id } = course;
    const data = moveToFormData(course);
    http
      .put(`api/v1/teacher/courses/${id}`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTeacherCourse = async (courseId: number) => {
  return new Promise<TeacherCourse>((resolve, reject) => {
    http
      .get(`api/v1/teacher/courses/${courseId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCourseQuizzes = async (courseId: number) => {
  return new Promise<QuizModel[]>((resolve, reject) => {
    http
      .get(`api/v1/teacher/courses/${courseId}/quizzes`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendCourseToReview = async (id: number) => {
  return new Promise<TeacherCourse>((resolve, reject) => {
    http
      .post(`/api/v1/teacher/courses/${id}/send_to_review`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCourseStudents = async (id: number) => {
  return new Promise<TeacherCourse>((resolve, reject) => {
    http
      .get(`api/v1/teacher/course_sessions/${id}/students`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
