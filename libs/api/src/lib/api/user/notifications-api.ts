import { _http } from '../../http';
import { NotificationModel } from '../../interfaces/notification-interface';

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
