import { _http } from '../../http';
import { CertificateModel } from '../../interfaces/certificate-interface';

const http = _http;

export const getStudentStatists = async () => {
  return new Promise<any>((resolve, reject) => {
    http
      .get('api/v1/student/statists')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getStudentCertificates = async () => {
  return new Promise<CertificateModel[]>((resolve, reject) => {
    http
      .get('api/v1/student/certificates')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
