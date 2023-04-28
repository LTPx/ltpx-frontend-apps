import { ApplicationTeach } from '../../interfaces/teacher-interface';
import { getApiUrl } from '../../api';
import { createInstance } from '../../http';

const localKey = "token_opm"
const API = getApiUrl();
const http = createInstance(API, localKey);

export const getPendingApplications = async () => {
  return new Promise<ApplicationTeach[]>((resolve, reject) => {
    http
      .get('api/v1/admin/application_teachers/pending')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getApplication = async (id: number) => {
  return new Promise<ApplicationTeach>((resolve, reject) => {
    http
      .get(`api/v1/admin/application_teachers/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const approveApplication = async (id: number) => {
  return new Promise<ApplicationTeach>((resolve, reject) => {
    http
      .post(`api/v1/admin/application_teachers/${id}/approve`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const rejectApplication = async (id: number) => {
  return new Promise<ApplicationTeach>((resolve, reject) => {
    http
      .post(`api/v1/admin/application_teachers/${id}/require_changes`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const approvedApplications = async () => {
  return new Promise<ApplicationTeach[]>((resolve, reject) => {
    http
      .get(`api/v1/admin/application_teachers/last_approved`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
