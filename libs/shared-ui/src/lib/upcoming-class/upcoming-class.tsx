import Icon from '../icon/icon';
import styles from './upcoming-class.module.scss';

/* eslint-disable-next-line */
export interface UpcomingClassProps {
  titleClass: string;
  session: number;
  date: string;
  time: string;
  learners: number;
}

export function UpcomingClass(props: UpcomingClassProps) {
  const { titleClass, session, date, time, learners } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head']}>
        <h4 className={styles['title']}>{titleClass}</h4>
        <h4>Session: {session}</h4>
      </div>
      <div className={styles['content']}>
        <div className={styles['item']}>
          <Icon icon={'calendar-check'} size={15} />
          <h4 className={styles['text']}>{date}</h4>
        </div>
        <div className={styles['item']}>
          <Icon icon={'clock-line'} size={15} />
          <h4 className={styles['text']}>{time}</h4>
        </div>
        <div className={styles['item']}>
          <Icon icon={'persons'} size={15} />
          <h4 className={styles['text']}>{learners} participantes</h4>
        </div>
      </div>
    </div>
  );
}

export default UpcomingClass;
