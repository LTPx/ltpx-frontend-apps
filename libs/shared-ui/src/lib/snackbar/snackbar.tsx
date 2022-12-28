import styles from './snackbar.module.scss';
import React, { useEffect, useState } from 'react';

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
  text?: string;
  open: boolean;
  tag?: string;
  position: SnackbarPosition;
  duration?: number;
  typeSnackbar?: SnackbarType;
  title: string;
  date: string;
}

export const Snackbar = (props: SnackbarProps) => {
  const { text, tag, title, date, position, duration, open, typeSnackbar } =
    props;

  useEffect(() => {
    if (duration && open) {
      setIsHidden(false);
      setAnimateOut(false);
      setTimeout(() => {
        setAnimateOut(true);
        setTimeout(() => {
          setIsHidden(true);
        }, 1500);
      }, duration);
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
  const positionSnackbar = positionClasses[position] || positionClasses.top;
  const colorsClasses = {
    warning: styles['warning-snackbar'],
    success: styles['success-snackbar'],
    error: styles['error-snackbar'],
    message: styles['message-snackbar'],
  };
  const snackbarColorClass =
    colorsClasses[typeSnackbar || SnackbarType.message];

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
            <h4>{tag}</h4>
            <h2>{title}</h2>
            <p>{text}</p>
            <h4>{date}</h4>
          </div>
          <div className={styles['']}></div>
          {/* <div className={styles['']} onClick={handleClose}>
            CLOSE
          </div> */}
        </div>
      )}
    </div>
  );
};

export default SnackbarPosition;
