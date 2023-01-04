import styles from './banner-notification.module.scss';

/* eslint-disable-next-line */

export enum BannerType {
  success = 'success',
  error = 'error',
  info = 'info',
}

export interface BannerNotificationProps {
  children: any;
  type?: BannerType;
}

export function BannerNotification(props: BannerNotificationProps) {
  const { children, type } = props;
  const colors = {
    success: styles['success'],
    error: styles['error'],
    info: styles['info'],
  }
  const selectedColor = colors[type || BannerType.success];
  return (
    <div className={`${styles['banner-notification']} ${selectedColor}`}>
      {children}
    </div>
  );
}

export default BannerNotification;
