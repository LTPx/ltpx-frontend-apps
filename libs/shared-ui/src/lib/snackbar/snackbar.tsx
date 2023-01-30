import styles from './snackbar.module.scss';
import React, { useEffect, useState } from 'react';
import Icon from '../icon/icon';

/* eslint-disable-next-line */
export enum SnackbarPosition {
  top = 'top',
  bottom = 'bottom',
  centerTop = 'centerTop',
  centerBottom = 'centerBottom',
}

export enum SnackbarType {
  warning = 'warning',
  success = 'success',
  error = 'error',
  message = 'message',
}

export interface SnackbarProps {
  open: boolean;
  text?: string;
  tag?: string;
  position: SnackbarPosition;
  duration?: number;
  kind?: SnackbarType;
  title: string;
  icon?: string;
  date?: string;
  onClose?: () => void;
}

export const Snackbar = (props: SnackbarProps) => {
  const { text, tag, title, date, position, duration, icon, open, kind, onClose } =
    props;

  useEffect(() => {
    console.log('here...');
    if (duration && open) {
      setIsHidden(false);
      setAnimateOut(false);
      setTimeout(() => {
        setAnimateOut(true);
        setTimeout(() => {
          setIsHidden(true);
          onClose && onClose();
        }, 1500);
      }, duration);
    }

    if (!duration && open) {
      setTimeout(() => {
        setAnimateOut(true);
        setTimeout(() => {
          setIsHidden(true);
          onClose && onClose();
        }, 1500);
      }, 1000);
    }
  }, [open]);

  const [isHidden, setIsHidden] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const defaultClasses = styles['snackbar'];
  const positionClasses = {
    top: styles['top-snackbar'],
    bottom: styles['bottom-snackbar'],
    centerTop: styles['center-top-snackbar'],
    centerBottom: styles['center-bottom-snackbar'],
  };
  const colorsClasses = {
    warning: styles['warning-snackbar'],
    success: styles['success-snackbar'],
    error: styles['error-snackbar'],
    message: styles['message-snackbar'],
  };
  const iconsStatus = {
    warning: 'exclamation-triangle',
    success: 'check-circle',
    error: 'close-circle-outline',
    message: 'exclamation-circle',
  };
  const positionSnackbar = positionClasses[position] || positionClasses.top;
  const snackbarColorClass = colorsClasses[kind || SnackbarType.message];
  const iconStatus = iconsStatus[kind || SnackbarType.message];

  const handleClose = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      {open && (
        <div
          className={`${defaultClasses} ${positionSnackbar} ${
            isHidden ? '' : styles['show']
          } ${animateOut ? styles['dismiss'] : ''}
            ${snackbarColorClass}
          `}
        >
          <div className={styles['container']}>
            <div className={styles['icon-section']}>
              {icon && <Icon icon={icon} size={20}></Icon>}
              {iconStatus && !icon && <Icon icon={iconStatus} size={20}></Icon>}
            </div>
            <div className={styles['content-section']}>
              <h4>{tag}</h4>
              <h3>{title}</h3>
              {text && <p>{text}</p>}
              <h4 className={`${styles['date']}`}>{date}</h4>
            </div>
            <div className={styles['close-section']}>
              <Icon onClick={handleClose} icon={'close'} size={15}></Icon>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnackbarPosition;
