import { _http } from '../../http';
import { NotificationModel } from '../../interfaces/notification-interface';
import { ICurrentUser } from '../../interfaces/user-interface';

const http = _http;

export const getNotifications = async () => {
  return new Promise<NotificationModel[]>((resolve, reject) => {
    http
      .get('/api/v1/user/notifications/last_notifications')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const readNotifications = async () => {
  return new Promise<ICurrentUser>((resolve, reject) => {
    http
      .post('/api/v1/user/notifications/read_notifications')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
