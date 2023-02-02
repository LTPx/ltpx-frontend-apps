import { _http } from '../../http';
import { CourseApiParams, CourseModel } from '../../interfaces/course-interface';
import { moveToFormData } from '../../utils';

const http = _http;

export const getPendingReviewCourses = async () => {
  return new Promise<CourseModel[]>((resolve, reject) => {
    http
      .get('api/v1/admin/courses/pending_approve')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getApprovedCourses = async () => {
  return new Promise<CourseModel[]>((resolve, reject) => {
    http
      .get('api/v1/admin/courses/approved_course')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const adminCreateCourse = async (course: CourseApiParams) => {
  return new Promise<CourseModel>((resolve, reject) => {
    const data = moveToFormData(course);
    http
      .post('api/v1/admin/courses', data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const adminEditCourse = async (course: CourseApiParams) => {
  return new Promise<CourseModel>((resolve, reject) => {
    const { id } = course;
    const data = moveToFormData(course);
    http
      .put(`api/v1/admin/courses/${id}`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const adminGetCourse = async (courseId: number) => {
  return new Promise<CourseModel>((resolve, reject) => {
    http
      .get(`api/v1/admin/courses/${courseId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const adminApproveCourse = async (id: number) => {
  return new Promise<CourseModel>((resolve, reject) => {
    http
      .post(`api/v1/admin/courses/${id}/approve`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
