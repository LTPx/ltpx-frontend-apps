import {
  Cart,
  Dropdown,
  NotificationItem,
  NotificationList,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './notifications.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@ltpx-frontend-apps/store';
import { NotificationModel } from '@ltpx-frontend-apps/api';
import { messaging } from '../../../firebase';
import { getToken } from 'firebase/messaging';

export function Notifications() {
  const {
    _setTokenDevice,
    _getNotifications,
    notifications,
    totalUnreadNotifications,
    clearUnreadNotification,
  } = useUser();
  const [notificationsItems, setNotificationsItems] = useState<
    NotificationItem[]
  >([]);
  const { fromNow } = useMoment();
  const icons = {
    task: 'task',
    quiz: 'quiz',
    system: 'cog',
    payment: 'bill',
    achievement: 'trophy',
  };

  const fetchNotifications = useCallback(async () => {
    await _getNotifications();
  }, []);

  async function fetchToken() {
    console.log('stop');
    try {
      const token = await getToken(messaging, {vapidKey: process.env.NX_FIREBASE_VAPID_KEY});
      if (token) {
        await _setTokenDevice(token);
      }
    } catch (error) {
      console.log('An error occurred while retrieving token. ', error);
    }
  }


  useEffect(() => {
    fetchNotifications();
    fetchToken();
  }, []);

  useEffect(() => {
    if (notifications.length) {
      const notificationsFormat = formatNotifications(notifications);
      setNotificationsItems(notificationsFormat);
    }
  }, [notifications]);

  function formatNotifications(notifications: NotificationModel[]) {
    return notifications.map((notification: NotificationModel) => {
      const icon = icons[notification.kind];
      return {
        kind: notification.kind,
        text: notification.text,
        date: fromNow(notification.created_at),
        icon: icon,
      };
    });
  }

  return (
    <Dropdown>
      <NotificationList notifications={notificationsItems} />
      <div
        className={styles['avatar']}
        onClick={() => {
          clearUnreadNotification();
        }}
      >
        <Cart amount={totalUnreadNotifications} />
      </div>
    </Dropdown>
  );
}

export default Notifications;
