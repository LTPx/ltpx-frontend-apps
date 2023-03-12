import { _http } from '../../http';
import { WithdrawalModel } from '../../interfaces/withdrawals-interfaces';

const http = _http;

export const getWithdrawalsByStatus = async (status: string) => {
  return new Promise<WithdrawalModel[]>((resolve, reject) => {
    http
      .get('api/v1/admin/withdrawals/get_by_status', {params: {status: status}})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getWithdrawal = async (id: number) => {
  return new Promise<WithdrawalModel[]>((resolve, reject) => {
    http
      .get(`api/v1/admin/withdrawals/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// export const getApprovedCourses = async () => {
//   return new Promise<CourseModel[]>((resolve, reject) => {
//     http
//       .get('api/v1/admin/courses/approved_courses')
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const adminCreateCourse = async (course: CourseApiParams) => {
//   return new Promise<CourseModel>((resolve, reject) => {
//     const data = moveToFormData(course);
//     http
//       .post('api/v1/admin/courses', data)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const adminEditCourse = async (course: CourseApiParams) => {
//   return new Promise<CourseModel>((resolve, reject) => {
//     const { id } = course;
//     const data = moveToFormData(course);
//     http
//       .put(`api/v1/admin/courses/${id}`, data)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const adminGetCourse = async (courseId: number) => {
//   return new Promise<CourseModel>((resolve, reject) => {
//     http
//       .get(`api/v1/admin/courses/${courseId}`)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const adminApproveCourse = async (id: number) => {
//   return new Promise<CourseModel>((resolve, reject) => {
//     http
//       .post(`api/v1/admin/courses/${id}/approve`)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
