import styles from './course-date-card.module.scss';

/* eslint-disable-next-line */
export interface CourseDateCardProps {
  title: string;
  description: string;
  time: string;
  className?: string;
}

export function CourseDateCard(props: CourseDateCardProps) {
  const { title, time, description, className } = props;
  return (
    <div className={`${styles['content']} ${className}`}>
      <h3>{title}</h3>
      <h4 className={styles['time']}>{time}</h4>
      <h4 className={styles['description']}>{description}</h4>
    </div>
  );
}

export default CourseDateCard;
