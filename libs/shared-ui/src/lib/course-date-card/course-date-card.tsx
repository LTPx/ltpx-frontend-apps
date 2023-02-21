import Button, { ColorsButton } from '../button/button';
import styles from './course-date-card.module.scss';

/* eslint-disable-next-line */
export interface CourseDateCardProps {
  title: string;
  description: string;
  time: string;
}

export function CourseDateCard(props: CourseDateCardProps) {
  const {title, time, description } = props;
  return (
      <div className={styles['content']}>
        <h3>{title}</h3>
        <h4 className={styles['description']}>{description}</h4>
        <h4 className={styles['time']}>{time}</h4>
      </div>
  );
}

export default CourseDateCard;
