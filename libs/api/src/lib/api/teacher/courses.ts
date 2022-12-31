import { _http } from "../../http";
import { Teacher } from "../../interfaces/teacher";

const http = _http;

export const getTeacherCourses = async() => {
  const response = await http.get('api/v1/teacher/courses');
  return response.data;
}

export const applyToTeach = async(teacher: Teacher) => {
  const response = await http.post('api/v1/teacher/apply_teach', { teacher });
  return response.data;
}
