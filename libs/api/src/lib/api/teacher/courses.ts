import { _http } from "../../http";
import { Teacher } from "../../interfaces/teacher";

const http = _http;

export const getTeacherCourses = async() => {
  const response = await http.get('api/v1/courses');
  return response.data;
}

export const applyToTeach = async(teacher: Teacher) => {
  const response = await http.post('api/v1/teachers', { teacher });
  return response.data;
}
