import Avatar, { AvatarSize } from '../avatar/avatar';
import Button, { ColorsButton } from '../button/button';
import styles from './class-card.module.scss';

export enum ClassStatus {
  live = 'Live',
  postpone = 'postpone',
  canceled = 'canceled',
}

/* eslint-disable-next-line */
export interface ClassCardProps {
  title: string;
  teacher: {
    name: string;
    image: string;
  };
  status: ClassStatus;
  startTime: Date;
  duration: number;
  children?: any;
}

export function ClassCard(props: ClassCardProps) {
  const { title, teacher, status, startTime, duration, children } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['teacher']}>
          <Avatar image={teacher.image} size={AvatarSize.small}/>
          <div className={styles['teacher-name']}>
            <label>Teacher</label>
            <h4>{teacher.name}</h4>
          </div>
        </div>
        <div className={styles['status']}>
          <h5>{status}</h5>
        </div>
      </div>
      <div className={styles['class']}>
        <h5>Start at: {startTime.getHours()}:00 pm</h5>
        <h3>Class: {title}</h3>
      </div>
      <div className={styles['time-duration']}>
        {/* <h5>Start at: {startTime.getHours()}:00h am</h5> */}
        <h5>Duration: {duration} min</h5>
      </div>
      {children}
    </div>
  );
}

export default ClassCard;
