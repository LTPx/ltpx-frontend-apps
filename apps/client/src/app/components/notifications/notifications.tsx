import {
  Cart,
  Dropdown,
  NotificationList,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './notifications.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@ltpx-frontend-apps/store';
import { NotificationModel } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface NotificationsProps {}

export function Notifications(props: NotificationsProps) {
  const { _getNotifications } = useUser();
  const [notifications, setNotifications] = useState<any[]>([]);
  const { fromNow } = useMoment();

  const icons = {
    task: 'task',
    quiz: 'quiz',
    system: 'cog',
    payment: 'bill',
    achievement: 'trophy',
  }

  const fetchNotifications = useCallback(async () => {
    const { success, data, error } = await _getNotifications();
    if (success) {
      const allNotifications = formatNotifications(data);
      setNotifications(allNotifications);
    } else {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  function formatNotifications(notifications: NotificationModel[]) {
    return notifications.map((notification: NotificationModel)=>{
      const icon = icons[notification.kind];
      return {
        kind: notification.kind,
        text: notification.text,
        date: fromNow(notification.created_at),
        icon: icon
      }
    })
  }

  return (
    <Dropdown>
      <NotificationList
        notifications={notifications}
        countNewNotification={notifications.length}
      />
      <div className={styles['avatar']}>
        <Cart amount={notifications.length} />
      </div>
    </Dropdown>
  );
}

export default Notifications;
