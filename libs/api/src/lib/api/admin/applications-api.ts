import { ApplicationTeach } from '../../interfaces/teacher-interface';
import { _http } from '../../http';
const http = _http;

export const getApplicationsByStatus = async (status: string) => {
  return new Promise<ApplicationTeach[]>((resolve, reject) => {
    http
      .get('api/v1/admin/application_teachers/get_by_status', {params: {status}})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

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

export const rejectApplication = async (id: number, comment: string) => {
  return new Promise<ApplicationTeach>((resolve, reject) => {
    http
      .post(`api/v1/admin/application_teachers/${id}/require_changes`, {comment})
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
