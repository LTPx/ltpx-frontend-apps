import styles from './course-counter-card.module.scss';

/* eslint-disable-next-line */
export interface CourseCounterCardProps {
  count: number;
  text: string;
}

export function CourseCounterCard(props: CourseCounterCardProps) {
  const {
    count,
    text,
  } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['counter']}>
        <label>{count}</label>
      </div>
      <div className={styles['description']}>
        <label>{text}</label>
      </div>
    </div>
  );
}

export default CourseCounterCard;
