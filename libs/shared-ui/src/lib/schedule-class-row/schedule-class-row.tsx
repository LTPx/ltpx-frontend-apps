import { Icon } from '@ltpx-frontend-apps/shared-ui';
import styles from './schedule-class-row.module.scss';

export enum StatusClass {
  live = 'live',
  completed = 'completed',
  upcoming = 'upcoming',
}
/* eslint-disable-next-line */
export interface ScheduleClassRowProps {
  title: string;
  duration: string | number;
  status?: StatusClass;
  date: string;
  date_month?: string;
  day_number?: string;
  start_time?: string;
  end_time?: string;
  participants: number;
}

export function ScheduleClassRow(props: ScheduleClassRowProps) {
  const {
    title,
    duration,
    status,
    date,
    date_month,
    start_time,
    end_time,
    day_number,
    participants,
  } = props;
  return (
    <div className={styles['meeting-row']}>
      <div className={styles['date']}>
        <h5>{date_month}</h5>
        <h3>{day_number}</h3>
        <h5>
          {start_time} - {end_time}
        </h5>
      </div>
      <div className={styles['information']}>
        <div className={styles['details']}>
          <h4>{title}</h4>
          <div className={styles['details-items']}>
            <div className={styles['details-item']}>
              <Icon icon="user-group" size={18} />
              <h5>{participants} Participantes</h5>
            </div>
            <div className={styles['details-item']}>
              <Icon icon="clock" size={18} />
              <h5>{duration} min</h5>
            </div>
          </div>
        </div>
        <div className={styles['actions']}>
          {/* <Button title="Iniciar clase" icon="desktop" /> */}
        </div>
      </div>
    </div>
  );
}

export default ScheduleClassRow;
