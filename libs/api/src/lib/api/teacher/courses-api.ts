import { _http } from '../../http';
import { CourseApiParams, TeacherCourse } from '../../interfaces/course-interface';
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

export const getTeacherCourse = async (courseId: string) => {
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
