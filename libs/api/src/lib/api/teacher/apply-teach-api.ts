import { _http } from '../../http';
import { ApplicationTeach, ApplyTeachApiParams, StatusTeacherAccount } from '../../interfaces/teacher';

const http = _http;

export const applyToTeach = async (teacher: ApplyTeachApiParams) => {
  return new Promise<{status: StatusTeacherAccount}>((resolve, reject) => {
    http
      .post('api/v1/teacher/application_teachers', teacher)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getApplicationTeach = async () => {
  return new Promise<ApplicationTeach>((resolve, reject) => {
    http
      .get('api/v1/teacher/my_application')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
