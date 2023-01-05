import { useState } from 'react';
import Icon from '../icon/icon';
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
  onClickClose?: () => void;
}

export function BannerNotification(props: BannerNotificationProps) {
  const [isHidden, setIsHidden] = useState(false)
  const { children, type, onClickClose } = props;
  const colors = {
    success: styles['success'],
    error: styles['error'],
    info: styles['info'],
  };

  const closeBanner = () => {
    setIsHidden(!isHidden);
    onClickClose && onClickClose();
  }

  const selectedColor = colors[type || BannerType.success];
  return (
    <>
      {isHidden ? (
        <></>
      ) : (
        <div className={`${styles['banner-notification']} ${selectedColor}`}>
          <div className={`${styles['content']}`}>
          {children}
          </div>
          <Icon icon='close' size={18} onClick={closeBanner}/>
        </div>
      )}
    </>

  );
}

export default BannerNotification;
