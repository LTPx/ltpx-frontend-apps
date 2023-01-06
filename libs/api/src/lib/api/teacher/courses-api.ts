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
  course.classes =  {
    condition: 'no mandatory',
    min: 3,
    max: 5,
    weeks: 2,
    call_time_min: 45,
    meetings: [
      { date: 'Monday 9', hour: '9am'},
      { date: 'Wednesday 11', hour: '9am'},
      { date: 'Friday 13', hour: '9am'},
      { date: 'Monday 16', hour: '9am'},
      { date: 'Wednesday 17', hour: '9am'},
      { date: 'Friday 18', hour: '9am'},
    ]
  }
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

export const getTeacherCourse = async(courseId: string) => {
  const response = await http.get(`api/v1/teacher/courses/${courseId}`);
  return response.data;
}
