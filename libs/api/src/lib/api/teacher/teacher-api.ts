import { _http } from '../../http';
import { ApplicationTeach, ApplyTeachApiParams, ApplyTeachModel, TeacherProfile } from '../../interfaces/teacher-interface';
import { encapsuleInFormData, moveToFormData, sendAsFormData } from '../../utils';

const http = _http;

export const getTeacherProfile = async () => {
  return new Promise<TeacherProfile>((resolve, reject) => {
    http
      .get('api/v1/teacher/profile')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateTeacherProfile = async (teacher: Partial<TeacherProfile>) => {
  const data = encapsuleInFormData(teacher, {mediaKeys: ['profile_image', 'profile_video']});
  return new Promise<TeacherProfile>((resolve, reject) => {
    http
      .put('api/v1/teacher/update_profile', data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const applyToTeach = async (teacher: ApplyTeachApiParams) => {
  const teacherFormData = moveToFormData(teacher);
  return new Promise<ApplyTeachModel>((resolve, reject) => {
    http
      .post('api/v1/teacher/application_teachers', teacherFormData)
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
