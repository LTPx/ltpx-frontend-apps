import styles from './input-text-status.module.scss';

/* eslint-disable-next-line */
export enum StatusInputText {
  error = 'error',
  success = 'success',
}

export interface InputTextStatusProps {
  status: StatusInputText;
  text: string;
}

export function InputTextStatus(props: InputTextStatusProps) {
  const { status, text } = props;

  const statusColor = {
    error: `${styles['status-error']}`,
    success: `${styles['status-success']}`,
  };

  const selectedStatus = statusColor[status];

  return (
    <div className={styles['container']}>
      <div className={`${selectedStatus} ${styles['status']}`}>
        <h5>{text}</h5>
      </div>
    </div>
  );
}

export default InputTextStatus;
