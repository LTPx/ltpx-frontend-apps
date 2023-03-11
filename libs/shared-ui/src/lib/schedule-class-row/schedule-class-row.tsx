import { Icon, MenuItem, Menu, Tag} from '@ltpx-frontend-apps/shared-ui';
import { ReactElement } from 'react';
import styles from './schedule-class-row.module.scss';

export enum StatusClass {
  live = 'live',
  completed = 'completed',
  upcoming = 'upcoming',
}

export interface ScheduleClassRowProps {
  title: string;
  duration: string | number;
  status?: StatusClass;
  date: string;
  dateMonth?: string;
  dayNumber?: string;
  startTime?: string;
  endTime?: string;
  participants: number;
  children?: ReactElement;
  dropdownActions?: MenuItem[];
  className?: string;
}

export function ScheduleClassRow(props: ScheduleClassRowProps) {
  const {
    title,
    duration,
    status,
    date,
    dateMonth,
    startTime,
    endTime,
    dayNumber,
    participants,
    children,
    dropdownActions,
    className,
  } = props;

  return (
    <div className={`${styles['meeting-row']} ${className}`}>
      <div className={styles['date']}>
        <h5>{dateMonth}</h5>
        <h3>{dayNumber}</h3>
        {/* <h5>{startTime} - {endTime}</h5> */}
      </div>
      <div className={styles['information']}>
        <div className={styles['details']}>
          <h4>{title}</h4>
          <div className={styles['details-items']}>
            <div className={styles['details-item']}>
              <Icon icon="user-group" size={18} color="#10b981" />
              <h5>0/{participants} Participantes</h5>
            </div>
            {/* <div className={styles['details-item']}>
              <Icon icon="clock" size={18} color="#fbbf24" />
              <h5>{duration} min</h5>
            </div> */}
            <div className={styles['details-item']}>
              <Icon icon="clock" size={15} color="#fbbf24" />
              <h5>Empieza: {startTime}</h5>
            </div>
          </div>
        </div>
        <div className={styles['actions']}>
          {children}
          {dropdownActions && (
            <Menu items={dropdownActions}>
              <Icon
                icon={'ellipsis-horizontal-outline'}
                size={15}
                className={styles['icon-button']}
              />
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleClassRow;
