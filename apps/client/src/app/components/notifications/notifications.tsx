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
import { fetchToken, onMessageListener } from '../../../../firebase';

export function Notifications() {
  const {
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

  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener().then((payload: any) => {
    setNotification({title: payload.notification.title, body: payload.notification.body})
    // setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  useEffect(() => {
    fetchNotifications();
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
