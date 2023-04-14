import Avatar, { AvatarSize } from '../avatar/avatar';
import styles from './notification-list.module.scss';

/* eslint-disable-next-line */
export interface Notification {
  image: string;
  text: string;
  date: string;
  read: boolean;
}

export interface NotificationListProps {
  notifications: Array<Notification>;
  countNewNotification: number;
}

export function NotificationList(props: NotificationListProps) {
  const { countNewNotification, notifications } = props;

  const NotificationRow = ({ image, text, date, read }: Notification) => (
    <div className={styles['notifications']}>
      <Avatar image={image} size={AvatarSize.small}></Avatar>
      <div className={styles['information']}>
        <h4>{text}</h4>
        <h5>{date}</h5>
      </div>
      <div
        className={`${styles['status']} ${read ? styles['read'] : ''}`}
      ></div>
    </div>
  );

  return (
    <div className={styles['container']}>
      {countNewNotification !== 0 && (
        <h3>Tienes {countNewNotification} nuevas notificaciones</h3>
      )}
      {notifications.length === 0 && <h4>🔔 No tienes nuevas notificaciones</h4>}
      {notifications.map((notification, index) => (
        <NotificationRow
          key={index}
          image={notification.image}
          text={notification.text}
          date={notification.date}
          read={notification.read}
        />
      ))}
    </div>
  );
}

export default NotificationList;
