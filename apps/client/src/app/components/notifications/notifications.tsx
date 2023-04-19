import {
  Cart,
  Dropdown,
  NotificationList,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './notifications.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface NotificationsProps {}

export function Notifications(props: NotificationsProps) {
  const { _getNotifications } = useUser();
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = useCallback(async () => {
    const { success, data, error } = await _getNotifications();
    if (success) {
      setNotifications(data);
    } else {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Dropdown>
      <NotificationList
        notifications={[]}
        countNewNotification={notifications.length}
      />
      <div className={styles['avatar']}>
        <Cart amount={notifications.length} />
      </div>
    </Dropdown>
  );
}

export default Notifications;
