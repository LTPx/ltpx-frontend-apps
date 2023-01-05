import { _http } from "../../http";
import { INewCourse } from "../../interfaces/course";
import { IApplyTeachFields, ITeacher } from "../../interfaces/teacher";

const http = _http;

export const getTeacherCourses = async() => {
  const response = await http.get('api/v1/teacher/courses');
  return response.data;
}

export const applyToTeach = async(teacher: IApplyTeachFields) => {
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
}

export const createCourse = async(course: INewCourse) => {
  return new Promise<INewCourse>((resolve, reject) => {
    http
    .post('api/v1/teacher/courses', course)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}
