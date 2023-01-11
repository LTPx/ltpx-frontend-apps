import { _http } from '../../http';
import { NewCourseApiParams, TeacherCourse } from '../../interfaces/course';
import { ApplyTeachApiParams, ITeacher } from '../../interfaces/teacher';
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

export const applyToTeach = async (teacher: ApplyTeachApiParams) => {
  return new Promise<ITeacher>((resolve, reject) => {
    http
      .post('api/v1/teacher/apply_teach', teacher)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createCourse = async (course: NewCourseApiParams) => {
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
