import styles from './banner-notification.module.scss';

/* eslint-disable-next-line */
export interface BannerNotificationProps {
  children: any;
}

export function BannerNotification(props: BannerNotificationProps) {
  const { children } = props;
  return (
    <div className={styles['banner-notification']}>
      {children}
    </div>
  );
}

export default BannerNotification;
