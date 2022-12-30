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
        <h1>{count}</h1>
      </div>
      <div className={styles['description']}>
        <h2>{text}</h2>
      </div>
    </div>
  );
}

export default CourseCounterCard;
