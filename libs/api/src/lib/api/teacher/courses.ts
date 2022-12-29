import { _http } from "../../http";

const http = _http;

export const getTeacherCourses  = async() => {
  const response = await http.get('api/v1/courses');
  return response.data;
}

// export const registerUser = async(email: string, password: string) => {
//   const response = await http.post('register', {
//     user: {
//       email,
//       password
//     }
//   });
//   setTokenAxios(response.headers);
//   return response.data;
// }
