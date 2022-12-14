import styles from './classes-calendar.module.scss';

/* eslint-disable-next-line */
export interface ClassesCalendarProps {}

export function ClassesCalendar(props: ClassesCalendarProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClassesCalendar!</h1>
    </div>
  );
}

export default ClassesCalendar;
