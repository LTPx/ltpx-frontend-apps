import { Icon } from '@ltpx-frontend-apps/shared-ui';
import Avatar, { AvatarSize } from '../avatar/avatar';
import styles from './notification-list.module.scss';

/* eslint-disable-next-line */
export interface NotificationItem {
  icon: string;
  text: string;
  date: string;
}

export interface NotificationListProps {
  notifications: Array<NotificationItem>;
  countNewNotification: number;
}

export function NotificationList(props: NotificationListProps) {
  const { countNewNotification, notifications } = props;

  const NotificationRow = ({ text, date, icon }: NotificationItem) => (
    <div className={styles['notifications']}>
      <Icon icon={icon} size={25} />
      <div className={styles['information']}>
        <h5 className={styles['text']}>{text}</h5>
        <h5 className={styles['date']}>{date}</h5>
      </div>
    </div>
  );

  return (
    <div className={styles['container']}>
      {/* {countNewNotification !== 0 && (
        <h3>Tienes {countNewNotification} nuevas notificaciones</h3>
      )} */}
      {notifications.length === 0 && <h4>🔔 No tienes nuevas notificaciones</h4>}
      {notifications.map((notification, index) => (
        <NotificationRow
          key={index}
          icon={notification.icon}
          text={notification.text}
          date={notification.date}
        />
      ))}
    </div>
  );
}

export default NotificationList;
